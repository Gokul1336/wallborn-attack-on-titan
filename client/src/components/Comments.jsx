import { useEffect, useState } from 'react';
import api from '../api/client';
import { useAuthStore } from '../store/authStore';
import './Comments.css';

export default function Comments({ targetType, targetSlug }) {
  const { user, status: authStatus } = useAuthStore();
  const [comments, setComments] = useState([]);
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadComments();
  }, [targetSlug]);

  async function loadComments() {
    setLoading(true);
    try {
      const { data } = await api.get(`/comments/${targetType}/${targetSlug}`);
      setComments(data.comments);
    } catch {
      setError('Could not load discussion thread.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!body.trim()) return;
    setPosting(true);
    setError(null);
    try {
      const { data } = await api.post(`/comments/${targetType}/${targetSlug}`, { body });
      setComments([data.comment, ...comments]);
      setBody('');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not post comment.');
    } finally {
      setPosting(false);
    }
  }

  async function handleDelete(commentId) {
    try {
      await api.delete(`/comments/${commentId}`);
      setComments(comments.filter((c) => c._id !== commentId));
    } catch {
      setError('Could not delete comment.');
    }
  }

  return (
    <div className="comments">
      <h3 className="comments__heading">Field Notes &amp; Theories</h3>

      {authStatus === 'authenticated' ? (
        <form onSubmit={handleSubmit} className="comments__form">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Add your theory or note to the record..."
            maxLength={1000}
            rows={3}
          />
          <button type="submit" disabled={posting || !body.trim()}>
            {posting ? 'Filing...' : 'File note'}
          </button>
        </form>
      ) : (
        <p className="mono-label comments__login-prompt">Log in to add a field note.</p>
      )}

      {error && <p className="comments__error mono-label">{error}</p>}

      {loading ? (
        <p className="mono-label">Loading discussion thread...</p>
      ) : comments.length === 0 ? (
        <p className="mono-label">No field notes filed yet. Be the first.</p>
      ) : (
        <ul className="comments__list">
          {comments.map((c) => (
            <li key={c._id} className="comments__item">
              <div className="comments__item-head">
                <span className="comments__author">{c.author?.username || 'Unknown'}</span>
                <span className="mono-label">{new Date(c.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="comments__body">{c.body}</p>
              {user && (user._id === c.author?._id || user.role === 'admin') && (
                <button className="comments__delete" onClick={() => handleDelete(c._id)}>
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
