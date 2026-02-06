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
const CLIENT_ID = process.env.CURRENT_CLIENT_ID || 'internal_aijossi';

// 2. Watch Target
const today = new Date().toISOString().split('T')[0];
const chroniclePath = path.join(__dirname, `../docs/chronicle/daily/${today}.md`);

// 3. Sync Function
async function syncChronicle() {
    if (!fs.existsSync(chroniclePath)) return;

    const content = fs.readFileSync(chroniclePath, 'utf8');
    const docRef = db.collection('clients').doc(CLIENT_ID).collection('chronicles').doc(today);

    // Parse Logs
    const logRegex = /(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) \[(.*?)\] \((.*?)\) -> \[(.*?)\]\n- \[(.*?)\] : ([\s\S]*?)(?=\n\d{4}-\d{2}-\d{2}|\n$)/g;
    let match;
    const logs = [];
    
    while ((match = logRegex.exec(content)) !== null) {
        logs.push({
            timestamp: match[1],
            speaker: match[2],
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
            content: content,
            logs: logs,
            lastUpdated: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        console.log(`🚀 Real-time Sync: ${logs.length} logs pushed.`);
    } catch (e) {
        console.error("❌ Sync Error:", e);
    }
}

// 4. Real-time Watcher
console.log(`👀 Watching for changes in ${chroniclePath}...`);
if (fs.existsSync(chroniclePath)) {
    syncChronicle(); // Initial sync
    fs.watch(chroniclePath, (eventType, filename) => {
        if (eventType === 'change') {
            syncChronicle();
        }
    });
} else {
    console.log("⚠️ Chronicle file not found. Waiting for creation...");
    // Polling fallback if file doesn't exist yet
    const interval = setInterval(() => {
        if (fs.existsSync(chroniclePath)) {
            console.log("✅ File detected. Starting watch.");
            syncChronicle();
            fs.watch(chroniclePath, (eventType, filename) => {
                if (eventType === 'change') syncChronicle();
            });
            clearInterval(interval);
        }
    }, 2000);
}
