import React, { useEffect, useState } from "react";
import styles from "./blog.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchBlogs } from "../../redux/slices/blogsCarusalSlice";
import BlogCarusal from "./blogCarausal/BlogCarusal";
import axiosInstance from "../../utils/axiosInstance";
import restEndpoints from "../../data/restEndPoints.json";
import { BlogCard } from "../../types/types";
import Lottie from "react-lottie-player";
import loaderDats from "../../Lottie/loaderSmall.json";
import Button from "../../components/atoms/Button/Button";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Blog: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { data: carausalData, loading: carausalLoading } = useSelector(
    (state: RootState) => state.blogCarausal
  );

  const [cardData, setCardData] = useState<BlogCard[]>([]);
  const [loadingCards, setLoadingCards] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const limit = 6;

  // Fetch carousal data only on initial render
  useEffect(() => {
    if (carausalData.length === 0) {
      dispatch(fetchBlogs());
    }
  }, [carausalData.length, dispatch]);

  // Fetch blog cards whenever currentPage changes
  useEffect(() => {
    const fetchBlogCards = async () => {
      setLoadingCards(true);
      try {
        const response = await axiosInstance.get(
          `/${restEndpoints.blogs}?page=${currentPage}&limit=${limit}`
        );
        // If it's not the first page, append new data
        if (currentPage > 1) {
          setCardData((prevData) => [...prevData, ...response.data.data]);
        } else {
          // For the first page, set the data directly
          setCardData(response.data.data);
        }
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Failed to fetch blog cards", error);
      } finally {
        setLoadingCards(false);
      }
    };

    fetchBlogCards();
  }, [currentPage]);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleCardClick = (id: string) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div className={styles.blog}>
      <Helmet>
        <title>SprintUp Blog - Insights on Tech Careers, Trends & Skills, Jobs, Lucknow</title>
        <meta
          name="description"
          content="Stay updated with SprintUp's blog, featuring articles on career guidance, industry trends, and insights into upskilling for Data Science, Full Stack, Digital Marketing and other job-ready courses."
        />
        <meta
          name="keywords"
          content="Tech Blog, Data Science Insights, Full Stack Careers, Digital Marketing Trends, SprintUp Blog"
        />
      </Helmet>
      <div className={styles.blogPage}>
        <BlogCarusal data={carausalData} loading={carausalLoading} />
        <div className={styles.bolgSection}>
          <h2 className={styles.blogTitle}>Recent blog posts</h2>
          <div className={styles.blogCardContainer}>
            {cardData.map((card) => {
              return (
                <div
                  key={card._id}
                  onClick={() => handleCardClick(card._id)}
                  className={styles.blogCard}
                >
                  <img
                    src={card.image}
                    alt="blog-image"
                    className={styles.blogImage}
                  />
                  <div className={styles.cardContent}>
                    <h2 className={styles.cardTitle}>{card.title}</h2>
                    <p className={styles.cardSubTitle}>{card.subtitle}</p>
                    <h5 className={styles.blogHistory}>
                      {card.author} | {card.time}
                    </h5>
                  </div>
                  <div className={styles.blogTag}>{card.tag}</div>
                </div>
              );
            })}
          </div>
          {loadingCards && (
            <div className={styles.blogCard__loader}>
              <Lottie
                animationData={loaderDats}
                play
                style={{ width: 200, height: 200 }}
              />
            </div>
          )}
          {currentPage < totalPages && (
            <Button
              className={styles.loadMoreBtn}
              disabled={loadingCards}
              text="Load More"
              onClick={handleLoadMore}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
