import React, { useEffect, useState } from "react";
import styles from "./blogDetails.module.scss";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { BlogPostDetails } from "../../types/types";
import restEndpoints from "../../data/restEndPoints.json";
import Lottie from "react-lottie-player";
import loaderDats from "../../Lottie/loaderSmall.json";
import { SafeHtmlComponent } from "../../components/molecule/Carausal/Carausal";

const BlogDetails: React.FC = () => {
  const { id } = useParams();
  const [blogDeatils, setBlogDeatils] = useState<BlogPostDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(
          `/${restEndpoints.blogs}/${id}`
        );
        setBlogDeatils(response.data);
      } catch (error) {
        console.error("Failed to fetch blog details", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  return (
    <div className={styles.blogDetails}>
      <div className={styles.blogDetailsPage}>
        {isLoading ? (
          <div className={styles.blogDetails__loader}>
            <Lottie
              animationData={loaderDats}
              play
              style={{ width: 300, height: 300 }}
            />
          </div>
        ) : blogDeatils ? (
          <>
            <h1 className={styles.blogHeading}>{blogDeatils.title}</h1>
            <div className={styles.blogHistory}>
              <h5>{blogDeatils.author}</h5>
              <p>Published on {blogDeatils.time}</p>
            </div>
            <div className={styles.imageContainer}>
              <div className={styles.blogTag}>{blogDeatils.tag}</div>
              <img
                className={styles.BlogPostImage}
                src={blogDeatils.image}
                alt="blog-image"
              />
            </div>
            <div className={styles.summaryContainer}>
              <p className={styles.summary}>{blogDeatils.summary}</p>
              <div className={styles.summaryDots}>
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className={styles.blogDesc}>
              {blogDeatils?.detail?.desc &&
                (blogDeatils.detail.desc || []).length > 0 &&
                blogDeatils.detail.desc.map((desc, idx) => {
                  return <p key={`desc--${idx}`}>{desc}</p>;
                })}
            </div>
            <div className={styles.pointContainer}>
              {(blogDeatils?.detail?.points || []).map((point, idx) => {
                return (
                  <div key={idx} className={styles.point}>
                    <h2>
                      <span>{idx + 1}.</span>
                      {point.heading}
                    </h2>
                    {point.desc && (
                      <p className={styles.pointDesc}>{point.desc}</p>
                    )}
                    {point.subpoints && (point.subpoints || []).length > 0 && (
                      <ul className={styles.subPointsContainer}>
                        {point.subpoints.map((subpoint, i) => {
                          return (
                            <li key={`${idx}-subpoint--${i}`}>
                              <strong>
                                {subpoint.heading}
                                {": "}
                              </strong>
                              {subpoint.desc}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
            <div className={styles.seperator} />
            <div className={styles.endContainer}>
              <h2>{blogDeatils.detail.endheading}</h2>
              <div className={styles.endDesc}>
                {blogDeatils.detail.enddesc.map((endDesc, idx) => {
                  return (
                    <p key={`endDesc--${idx}`}>
                      {SafeHtmlComponent(endDesc as string)}
                    </p>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <p>NO DATA FOUND</p>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
