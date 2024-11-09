import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

import './Article.css';

export default function Article() {
  const { urlId } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const refDoc = doc(db, 'articles', urlId);
      const docSnap = await getDoc(refDoc);
      if (docSnap.exists()) {
        setArticle(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };
    fetchArticle();
  }, [urlId]);

  if (!article) {
    return <p>Loading...</p>;
  }

  return (
    <div className="article-page">
      <h2>{article.title}</h2>
      <p><strong>Author:</strong> {article.author}</p>
      <p>{article.description}</p>

      {/* Update button */}
      <button onClick={() => navigate(`/edit/${urlId}`)} className="update-button">
        Update
      </button>
    </div>
  );
}
