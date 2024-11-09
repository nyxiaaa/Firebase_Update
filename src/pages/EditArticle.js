// EditArticle.js
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import './EditArticle.css';

export default function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({ title: '', author: '', description: '' });

  useEffect(() => {
    const fetchArticle = async () => {
      const refDoc = doc(db, 'articles', id);
      const docSnap = await getDoc(refDoc);
      if (docSnap.exists()) {
        setArticle(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };
    fetchArticle();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticle(prevState => ({ ...prevState, [name]: value }));
  };

  const handleUpdate = async () => {
    const refDoc = doc(db, 'articles', id);
    await updateDoc(refDoc, article);
    navigate('/'); // navigate back to the Home page
  };

  return (
    <div className="edit-article">
      <h2>Edit Article</h2>
      <div className="edit-form">
        <input
          type="text"
          name="title"
          value={article.title}
          onChange={handleInputChange}
          placeholder="Title"
        />
        <input
          type="text"
          name="author"
          value={article.author}
          onChange={handleInputChange}
          placeholder="Author"
        />
        <textarea
          name="description"
          value={article.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <div className="button-group">
          <button className="update-button" onClick={handleUpdate}>Update</button>
          <button className="cancel-button" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
