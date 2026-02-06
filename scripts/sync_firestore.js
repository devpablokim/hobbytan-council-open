const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// 1. Initialize Firebase
try {
    const serviceAccount = require('../serviceAccountKey.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log("✅ Firebase Admin Initialized");
} catch (e) {
    console.error("❌ Failed to init Firebase:", e.message);
    process.exit(1);
}

const db = admin.firestore();
// Changed to HEADQUARTER per CEO instruction
const CLIENT_ID = process.env.CURRENT_CLIENT_ID || 'HEADQUARTER';

// 2. Watch Target
const today = new Date().toISOString().split('T')[0];
// Watch BOTH daily chronicle AND meeting logs
const dailyPath = path.join(__dirname, `../docs/chronicle/daily/${today}.md`);
const meetingDir = path.join(__dirname, `../docs/chronicle/daily/meeting/`);

// 3. Sync Function
async function syncChronicle(filePath, type = 'daily') {
    if (!fs.existsSync(filePath)) return;

    const content = fs.readFileSync(filePath, 'utf8');
    // Doc ID: daily -> YYYY-MM-DD, meeting -> filename
    const docId = type === 'daily' ? today : path.basename(filePath, '.md');
    
    const docRef = db.collection('clients').doc(CLIENT_ID).collection('chronicles').doc(docId);

    // Enhanced Parser for Bubbles
    // Regex to capture: [Speaker] (ID) -> [Target] \n - [Type] : Content
    const logRegex = /(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) \[(.*?)\] \((.*?)\) -> \[(.*?)\]\n- \[(.*?)\] : ([\s\S]*?)(?=\n\d{4}-\d{2}-\d{2}|\n$)/g;
    
    let match;
    const logs = [];
    
    while ((match = logRegex.exec(content)) !== null) {
        logs.push({
            timestamp: match[1],
            speaker: match[2].replace('가재', 'TAN'), // Ensure TAN naming
            swanId: match[3],
            target: match[4],
            type: match[5],
            message: match[6].trim()
        });
    }

    // Update Firestore
    try {
        await docRef.set({
            date: today,
            type: type,
            title: type === 'daily' ? 'Daily Chronicle' : path.basename(filePath, '.md'),
            content: content,
            logs: logs,
            lastUpdated: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        console.log(`🚀 Synced ${type}: ${logs.length} logs to ${CLIENT_ID}/${docId}`);
    } catch (e) {
        console.error("❌ Sync Error:", e);
    }
}

// 4. Watcher Logic
console.log(`👀 Watching Daily: ${dailyPath}`);
if (fs.existsSync(dailyPath)) {
    syncChronicle(dailyPath, 'daily');
    fs.watch(dailyPath, () => syncChronicle(dailyPath, 'daily'));
}

console.log(`👀 Watching Meetings: ${meetingDir}`);
if (fs.existsSync(meetingDir)) {
    fs.readdirSync(meetingDir).forEach(file => {
        if (file.endsWith('.md')) {
            const p = path.join(meetingDir, file);
            syncChronicle(p, 'meeting');
            fs.watch(p, () => syncChronicle(p, 'meeting'));
        }
    });
    // Watch dir for new files
    fs.watch(meetingDir, (eventType, filename) => {
        if (filename && filename.endsWith('.md')) {
            const p = path.join(meetingDir, filename);
            syncChronicle(p, 'meeting');
        }
    });
}
