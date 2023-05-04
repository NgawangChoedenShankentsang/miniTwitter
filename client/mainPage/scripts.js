/* eslint-disable */
const postList = document.getElementById("postList");
const postForm = document.getElementById("postForm");

function createComment(text) {
    const comment = document.createElement("div");
    comment.classList.add("comment");

    const commentText = document.createElement("p");
    commentText.textContent = `~ ${text}`;

    comment.appendChild(commentText);
    return comment;
}

function createPost(content, postId) {
    const post = document.createElement("div");
    post.classList.add("post");
    post.setAttribute("data-id", postId);

    const postContent = document.createElement("p");
    postContent.textContent = content;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteButton");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", async () => {
      try {
        const response = await fetch(`/posts/${postId}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
      });
      
      if (response.ok) {
        postList.removeChild(post);
      } else {
        alert("Error deleting post");
      }
      }   catch (error) {
        console.log(error);
        alert("Error deleting post");
      }
      });

    let likeCount = 0;
    const likeButton = document.createElement("button");
    likeButton.classList.add("likeButton");
    likeButton.textContent = `Like (${likeCount})`;
    likeButton.addEventListener("click", () => {
        likeCount++;
        likeButton.textContent = `Like (${likeCount})`;
    });

    const commentButton = document.createElement("button");
    commentButton.classList.add("commentButton");
    commentButton.textContent = "Comment";

    const commentsSection = document.createElement("div");
    commentsSection.classList.add("commentsSection");
    commentsSection.style.display = "none";

    const commentForm = document.createElement("form");
    commentForm.style.display = "none";

    const commentInput = document.createElement("input");
    commentInput.setAttribute("type", "text");
    commentInput.setAttribute("placeholder", "Write a comment...");

    commentForm.appendChild(commentInput);

    commentButton.addEventListener("click", () => {
        if (commentForm.style.display === "none") {
            commentForm.style.display = "block";
            commentsSection.style.display = "block";
        } else {
            commentForm.style.display = "none";
        }
    });

    commentForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (commentInput.value.trim()) {
            const newComment = createComment(commentInput.value);
            commentsSection.appendChild(newComment);
            commentInput.value = "";
        }
    });

    post.appendChild(postContent);
    post.appendChild(deleteButton);
    post.appendChild(likeButton);
    post.appendChild(commentButton);
    post.appendChild(commentForm);
    post.appendChild(commentsSection);
    postList.appendChild(post);
}

postForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const postContent = document.getElementById("postContent");
  if (postContent.value.trim()) {
    try {
      const response = await fetch("/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ content: postContent.value }),
      });

      console.log("Response:", response); // debugging

      if (response.ok) {
        const responseText = await response.text();
        console.log("Response Text:", responseText); // debugging
        const newPost = JSON.parse(responseText);
        console.log("Response:", response, "Response JSON:", newPost); // debugging
        createPost(newPost.content, newPost.id);
        postContent.value = "";
      } else {
        console.log("Response:", response); // debugging
        alert("Error creating post");
      }
    } catch (error) {
      console.log("Error creating post. Exception:", error); // debugging
      alert("Error creating post");
    }
  }
});

  
