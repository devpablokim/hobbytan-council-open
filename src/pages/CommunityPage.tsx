import { useState } from 'react';
import { posts } from '../data/mockData';

export function CommunityPage() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">커뮤니티</h1>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">
          {showForm ? '취소' : '✏️ 글 작성'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h2 className="font-bold text-gray-900 mb-4">새 글 작성</h2>
          <input value={title} onChange={e => setTitle(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm mb-3" placeholder="제목을 입력하세요" />
          <textarea value={content} onChange={e => setContent(e.target.value)} rows={4} className="w-full border rounded-lg px-3 py-2 text-sm mb-3" placeholder="내용을 작성하세요..." />
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">게시하기</button>
        </div>
      )}

      <div className="space-y-4">
        {posts.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)).map(post => (
          <div key={post.postId} className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-start justify-between">
              <div>
                {post.pinned && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full mr-2">📌 고정</span>}
                {post.teamId && <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full mr-2">팀 전용</span>}
                <h3 className="font-bold text-gray-900 mt-1">{post.title}</h3>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{post.content}</p>
            <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
              <span>👤 {post.authorName}</span>
              <span>❤️ {post.likesCount}</span>
              <span>💬 {post.commentsCount}</span>
              <span>{new Date(post.createdAt).toLocaleDateString('ko-KR')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
