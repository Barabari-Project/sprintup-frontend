import { createWriteStream } from "fs";
import { SitemapStream, streamToPromise } from "sitemap";


// Import your routes from React Router
const routes = [
    "/",
    "/course-details",
    "/values",
    "/blog",
    "/contact",
    "/dashboard",
    "/course-syllabus/data-analytics",
    "/course-syllabus/mern-full-stack",
    "/course-syllabus/digital-marketing"
];

const baseURL = "https://www.sprintup.in";

const generateSitemap = async () => {
  const sitemap = new SitemapStream({ hostname: baseURL });

  // Add routes to the sitemap
  routes.forEach((route) => {
    sitemap.write({ url: route, changefreq: "weekly", priority: 0.8 });
  });

  sitemap.end();

  // Save sitemap to file
  const writeStream = createWriteStream("../public/sitemap.xml");
  await streamToPromise(sitemap).then((data) => writeStream.write(data));

  console.log("Sitemap generated successfully!");
};

generateSitemap().catch((error) => console.error("Error generating sitemap:", error));