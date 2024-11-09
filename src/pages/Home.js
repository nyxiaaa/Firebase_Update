import { Link } from 'react-router-dom';
import { getDocs, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useEffect, useState } from 'react';
import DeleteIcon from '../assets/delete.svg';

// styles
import './Home.css';

export default function Home() {
  const [articles, setArticles] = useState(null);
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [updatedArticle, setUpdatedArticle] = useState({ title: '', author: '', description: '' });

  useEffect(() => {
    const refCollection = collection(db, 'articles');
    onSnapshot(refCollection, (snapshot) => {
      let results = [];
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        results.push({
          id: doc.id,
          author: data.author,
          description: data.description,
          title: data.title
        });
      });
      setArticles(results);
    });
  }, []);

  const handleDelete = async (id) => {
    const refDoc = doc(db, 'articles', id);
    await deleteDoc(refDoc);
  };

  const handleEditClick = (article) => {
    setEditingArticleId(article.id);
    setUpdatedArticle({
      title: article.title,
      author: article.author,
      description: article.description
    });
  };

  const handleUpdate = async (id) => {
    const refDoc = doc(db, 'articles', id);
    await updateDoc(refDoc, updatedArticle);
    setEditingArticleId(null); // close the form after updating
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedArticle(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="home">
      <h2>Articles</h2>
      {articles && articles.map(article => (
        <div key={article.id} className="card">
          {editingArticleId === article.id ? (
            // Edit form
            <div className="edit-form">
              <input
                type="text"
                name="title"
                value={updatedArticle.title}
                onChange={handleInputChange}
                placeholder="Title"
              />
              <input
                type="text"
                name="author"
                value={updatedArticle.author}
                onChange={handleInputChange}
                placeholder="Author"
              />
              <textarea
                name="description"
                value={updatedArticle.description}
                onChange={handleInputChange}
                placeholder="Description"
              />
              <button onClick={() => handleUpdate(article.id)}>Save</button>
              <button onClick={() => setEditingArticleId(null)}>Cancel</button>
            </div>
          ) : (
            // Display article details
            <>
              <h3>{article.title}</h3>
              <p>Written by {article.author}</p>
              <p>{article.description}</p>
              <Link to={`/articles/${article.id}`}>Read More...</Link>
              <img
                className="icon"
                onClick={() => handleDelete(article.id)}
                src={DeleteIcon} alt="delete icon"
              />
              <button 
                onClick={() => handleEditClick(article)}>Update
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
