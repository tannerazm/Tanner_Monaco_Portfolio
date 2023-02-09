// BASE FOR LOCAL CHANGES
const BASE = "http://localhost:8080";

// BASE FOR NETLIFY CHANGES
// const BASE = "https://tannermonaco.netlify.app/"

// USER FUNCTIONS

export async function loginPerson(username, password) {
  try {
    const response = await fetch(`${BASE}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const result = await response.json();
    const token = result.token;
    localStorage.setItem("token", token);
    return result;
  } catch (error) {
    throw error;
  }
}

// BLOG POST FUNCTIONS

export async function createPost(
  blogPicture,
  blogDate,
  blogTitle,
  blogContent
) {
  try {
    const response = await fetch(`${BASE}/api/blog_posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blogPicture: blogPicture,
        blogDate: blogDate,
        blogTitle: blogTitle,
        blogContent: blogContent,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getAllPosts() {
  try {
    const response = await fetch(`${BASE}/api/blog_posts`);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updatePostPhoto(
  postID,
  blogPicture
) {
  try {
    const response = await fetch(`${BASE}/api/blog_posts/photo/${postID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blogPicture: blogPicture,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updatePostDate(
  postID,
  blogDate
) {
  try {
    const response = await fetch(`${BASE}/api/blog_posts/date/${postID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blogDate: blogDate,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updatePostTitle(
  postID,
  blogTitle
) {
  try {
    const response = await fetch(`${BASE}/api/blog_posts/title/${postID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blogTitle: blogTitle,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updatePostContent(
  postID,
  blogContent
) {
  try {
    const response = await fetch(`${BASE}/api/blog_posts/content/${postID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blogContent: blogContent,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function deletePost(postID) {
  try {
    const response = await fetch(`${BASE}/api/blog_posts/${postID}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
