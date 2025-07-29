// components/Feed/PostCard.jsx
const PostCard = ({ post, onLike, onComment }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-4 mb-6">
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-semibold">{post.author}</h3>
        <span className="text-sm text-gray-500">{post.date}</span>
      </div>
      <p className="my-2 text-gray-800">{post.content}</p>

      {post.imageUrl && (
        <img src={post.imageUrl} alt="Uploaded" className="rounded-lg mb-2" />
      )}
      {post.videoUrl && (
        <video controls className="w-full rounded-lg mb-2">
          <source src={post.videoUrl} type="video/mp4" />
        </video>
      )}

      <div className="text-sm text-gray-600 mb-2">❤️ {post.likes} Likes</div>

      <button onClick={() => onLike(post.id)} className="text-blue-500 text-sm">Like</button>
      <button onClick={() => onComment(post.id)} className="text-blue-500 text-sm ml-4">💬 Comment</button>
    </div>
  );
};
