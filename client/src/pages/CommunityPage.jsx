import React, { useState, useEffect } from "react";

const dummyPosts = [
  {
    id: 1,
    author: "@CraftQueen",
    content: "How do I price my handmade bags for export?",
    date: "July 29, 2025",
    likes: 12,
    comments: [
      { id: 1, user: "@mentorMarie", text: "Start by checking Etsy and local market prices." },
      { id: 2, user: "@JohnK", text: "Use cost+markup method for now." },
    ],
  },
  {
    id: 2,
    author: "@MikeArt",
    content: "Check out my first art fair booth!",
    date: "July 28, 2025",
    likes: 30,
    comments: [],
  },
];

const CommunityPage = () => {
  const [posts, setPosts] = useState(() => {
    const stored = localStorage.getItem("heva-posts");
    return stored ? JSON.parse(stored) : dummyPosts;
  });
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);
  const [newPostVideo, setNewPostVideo] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [activePostId, setActivePostId] = useState(null);
  const [toast, setToast] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    localStorage.setItem("heva-posts", JSON.stringify(posts));
  }, [posts]);

  const handlePostSubmit = () => {
    if (!newPostContent.trim()) return;

    const newPost = {
      id: Date.now(),
      author: "@you",
      content: newPostContent,
      date: new Date().toLocaleDateString(),
      likes: 0,
      comments: [],
      image: newPostImage ? URL.createObjectURL(newPostImage) : null,
      video: newPostVideo ? URL.createObjectURL(newPostVideo) : null,
    };

    setPosts([newPost, ...posts]);
    setNewPostContent("");
    setNewPostImage(null);
    setNewPostVideo(null);
    setToast("✅ Post published!");
    setTimeout(() => setToast(null), 3000);
  };

  const handleCommentSubmit = (postId) => {
    if (!newComment.trim()) return;
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, { id: Date.now(), user: "@you", text: newComment }],
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    setNewComment("");
    setActivePostId(null);
  };

  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
  };

  const handleDelete = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  const filteredPosts = posts.filter((post) =>
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className="p-4 max-w-5xl mx-auto space-y-12">
      {toast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow">{toast}</div>
      )}

      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-2">HEVA CreativeHub Community</h1>
        <p className="text-lg text-gray-600">Empowering African Creatives with Tools, Support, and Community</p>
        <div className="mt-4 space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Explore Resources</button>
          <button className="bg-gray-200 px-4 py-2 rounded">Register to Join</button>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-50 p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-2">🧠 About HEVA</h2>
        <p className="text-gray-700 mb-2">HEVA supports creative entrepreneurs across Africa by providing funding, mentorship, and access to markets. Over 500 creatives empowered across 10+ countries.</p>
        <a href="/about" className="text-blue-500 text-sm">Learn more →</a>
      </section>

      {/* Stories Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">💬 Stories from Entrepreneurs</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="font-semibold">@NiaCrafts</h3>
            <p>"HEVA's mentorship helped me triple my sales this year. Forever grateful!"</p>
            <div className="text-sm text-gray-500 mt-2">❤️ 24 Likes · 💬 8 Comments</div>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="font-semibold">@TheLeatherCo</h3>
            <p>"Funding from HEVA allowed us to open our first shop in Kigali!"</p>
            <div className="text-sm text-gray-500 mt-2">❤️ 15 Likes · 💬 5 Comments</div>
          </div>
        </div>
      </section>

      {/* Create Post Section */}
      <section className="bg-white shadow p-4 rounded-xl">
        <h2 className="text-xl font-semibold mb-2">📢 Create a Post</h2>
        <textarea
          rows="3"
          className="w-full p-2 border rounded-lg mb-2"
          placeholder="Share your story or ask a question..."
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        ></textarea>
        <div className="flex gap-4 mb-2">
          <input type="file" accept="image/*" onChange={(e) => setNewPostImage(e.target.files[0])} />
          <input type="file" accept="video/*" onChange={(e) => setNewPostVideo(e.target.files[0])} />
        </div>
        <button onClick={handlePostSubmit} className="bg-blue-600 text-white px-6 py-2 rounded">
          Post
        </button>
      </section>

      {/* Search + Feed Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">🧵 Community Feed</h2>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />
        {paginatedPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl shadow p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div>
                  <h3 className="font-semibold">{post.author}</h3>
                  <p className="text-xs text-gray-500">{post.role || "Creative Member"}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{post.date}</span>
            </div>
            <p className="my-2 text-gray-800 whitespace-pre-line">{post.content}</p>
            {post.image && <img src={post.image} alt="post" className="rounded-lg my-2 max-h-64 object-cover" />}
            {post.video && (
              <video controls className="w-full rounded-lg my-2">
                <source src={post.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <div className="text-sm text-gray-600 mb-2 flex items-center gap-4">
              <button onClick={() => handleLike(post.id)} className="text-red-500">❤️ {post.likes} Likes</button>
              <button onClick={() => handleDelete(post.id)} className="text-gray-500">🗑️ Delete</button>
            </div>
            <div className="border-t pt-2">
              {post.comments.map((c) => (
                <div key={c.id} className="mb-1">
                  <span className="font-medium">{c.user}</span>: {c.text}
                </div>
              ))}
            </div>
            {activePostId === post.id ? (
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 border p-2 rounded-lg"
                />
                <button
                  onClick={() => handleCommentSubmit(post.id)}
                  className="bg-blue-600 text-white px-4 rounded-lg"
                >
                  Post
                </button>
              </div>
            ) : (
              <div className="mt-2 flex gap-4">
                <button onClick={() => setActivePostId(post.id)} className="text-blue-500 text-sm">💬 Add a comment</button>
                <button
                  onClick={() => {
                    setShowMessageModal(true);
                    setSelectedUser(post.author);
                  }}
                  className="text-purple-500 text-sm"
                >
                  📬 Message
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-4">
          {[...Array(Math.ceil(filteredPosts.length / postsPerPage)).keys()].map((n) => (
            <button
              key={n}
              onClick={() => setCurrentPage(n + 1)}
              className={`px-3 py-1 rounded ${currentPage === n + 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              {n + 1}
            </button>
          ))}
        </div>
      </section>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-2">Message {selectedUser}</h3>
            <textarea className="w-full p-2 border rounded h-28" placeholder="Type your message..."></textarea>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setShowMessageModal(false)} className="bg-gray-300 px-4 py-1 rounded">Cancel</button>
              <button className="bg-blue-600 text-white px-4 py-1 rounded">Send</button>
            </div>
          </div>
        </div>
      )}

      {/* Resources Section */}
      <section className="bg-gray-100 p-6 rounded-xl">
        <h2 className="text-2xl font-semibold mb-4">📚 Free & Paid Resources</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-medium">Business Plan Template</h4>
            <p className="text-sm text-gray-600">Free - Editable Word doc</p>
            <button className="mt-2 text-blue-600 text-sm">Download</button>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-medium">Pricing Your Product - Mini Course</h4>
            <p className="text-sm text-gray-600">Paid - KES 500</p>
            <button className="mt-2 text-blue-600 text-sm">Purchase</button>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">🗓️ Upcoming Events & Trainings</h2>
        <div className="bg-white rounded-xl p-4 shadow">
          <h4 className="font-medium">Creative Financing 101</h4>
          <p className="text-sm text-gray-600">📍 Online | 🗓️ Aug 8, 2025 | 👥 85 Registered</p>
          <button className="mt-2 text-blue-600 text-sm">Register</button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-blue-50 p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-2">🙋‍♀️ Join the HEVA Community</h3>
        <p className="mb-4">Access resources, connect with creatives, and grow your impact.</p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded">Sign Up Now</button>
      </section>
    </div>
  );
};

export default CommunityPage;
