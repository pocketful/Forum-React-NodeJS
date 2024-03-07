-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 24, 2023 at 05:06 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `qa_forum`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `answer_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `archived` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `answers`:
--   `question_id`
--       `questions` -> `question_id`
--   `user_id`
--       `users` -> `user_id`
--

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`answer_id`, `user_id`, `question_id`, `content`, `created_at`, `updated_at`, `archived`) VALUES
(1, 4, 1, 'One fascinating perspective comes from Immanuel Kant\'s transcendental idealism, challenging how we perceive reality. Additionally, Simone de Beauvoir\'s existentialist view sheds light on personal responsibility in shaping our reality.', '2022-07-28 15:43:14', '2022-07-28 15:44:36', 0),
(2, 4, 1, 'Also you can explore Friedrich Nietzsche\'s perspectivism, a philosophical stance that introduces a captivating dimension to our understanding of truth and reality. Nietzsche posits that reality is inherently subjective, asserting that individual perspectives significantly shape our perception of the world. In essence, he challenges the notion of an objective reality independent of human interpretation.', '2022-07-28 15:45:48', NULL, 0),
(3, 4, 3, 'Technology has revolutionized art creation, allowing artists to experiment with new mediums like digital illustration and virtual reality. This shift has expanded the possibilities for self-expression and pushed the boundaries of traditional art forms.', '2022-07-30 17:41:09', NULL, 0),
(4, 1, 1, 'Immerse yourself in phenomenology, especially Edmund Husserl\'s work. It delves into the structures of consciousness and how they shape our perception of reality. A bit dense but worth the intellectual journey!', '2022-08-02 10:40:30', NULL, 0),
(5, 3, 3, 'As a tech-savvy artist, I\'ve witnessed firsthand how digital tools have enhanced the creative process. From graphic design software to 3D printing, technology has provided artists with efficient tools to translate their visions into innovative and visually stunning pieces.', '2022-08-02 10:42:36', NULL, 0),
(6, 1, 3, 'While digital art gains popularity, traditional artists like myself have also benefited from technology. Online platforms enable us to showcase our work to global audiences, fostering a diverse appreciation for various art forms, both traditional and contemporary.', '2022-08-02 13:23:41', NULL, 0),
(7, 3, 1, 'I recently read about George Berkeley\'s subjective idealism. It\'s a captivating perspective suggesting that reality exists only in our perception and doesn\'t have an independent existence. Quite mind-expanding!', '2022-08-02 13:40:45', '2022-08-03 09:08:36', 0),
(8, 4, 3, 'Virtual galleries and augmented reality exhibits have transformed the way audiences experience art. Now, we can explore masterpieces from the comfort of our homes, breaking down geographical barriers and democratizing access to the art world.', '2022-08-02 13:59:45', NULL, 0),
(9, 3, 3, 'Technology acts as a bridge between classical and modern art. Through digital archives and virtual museums, we can trace the evolution of artistic techniques, fostering a deeper understanding and appreciation for the historical context that influences contemporary creations.', '2022-08-02 14:03:06', NULL, 0),
(10, 4, 3, 'Artificial intelligence has entered the art scene, collaborating with human artists to generate unique pieces. This fusion of creativity and technology sparks new conversations about the definition of art and challenges traditional notions of authorship.', '2022-08-02 14:08:26', NULL, 0),
(11, 1, 3, 'Museums now leverage technology to enhance visitor experiences. Interactive exhibits, virtual tours, and multimedia installations engage audiences in ways unimaginable before. This evolution ensures that art remains a vibrant and relevant part of our culture.', '2022-08-02 15:10:44', NULL, 0),
(12, 4, 3, 'As a student artist, technology has provided a vast pool of online tutorials and collaborative platforms. Learning and sharing artistic techniques have become more accessible, fostering a global community where aspiring artists can connect and grow together.', '2022-08-02 17:25:53', NULL, 0),
(13, 1, 4, 'Try a lemon butter pasta! Cook your favorite pasta, toss it with melted butter, fresh lemon juice, grated Parmesan, and a pinch of salt. Simple, yet incredibly tasty.', '2022-08-03 04:33:34', NULL, 0),
(14, 2, 4, 'Elevate your dining experience with a mushroom Alfredo pasta. Sauté a medley of mushrooms, add a blend of cream, Parmesan, and a touch of nutmeg for a rich and comforting flavor. Toss this decadent mixture with your pasta, ensuring each bite is a symphony of delightful tastes and textures.', '2022-08-03 05:15:25', '2024-03-05 11:29:04', 0);

-- --------------------------------------------------------

--
-- Table structure for table `answers_votes`
--

CREATE TABLE `answers_votes` (
  `vote_id` int(11) NOT NULL,
  `answer_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `vote` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `answers_votes`:
--   `answer_id`
--       `answers` -> `answer_id`
--   `user_id`
--       `users` -> `user_id`
--

--
-- Dumping data for table `answers_votes`
--

INSERT INTO `answers_votes` (`vote_id`, `answer_id`, `user_id`, `vote`) VALUES
(1, 2, 4, 1),
(2, 2, 2, 1),
(3, 2, 1, 1),
(4, 1, 1, -1),
(5, 4, 1, -1),
(6, 7, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `question_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `archived` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `questions`:
--   `user_id`
--       `users` -> `user_id`
--

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`question_id`, `user_id`, `title`, `content`, `created_at`, `updated_at`, `archived`) VALUES
(1, 1, 'Are there some interesting philosophical perspectives on the nature of reality?', 'Delving into philosophy lately, I\'m particularly interested in exploring different perspectives on the nature of reality. Are there any notable philosophers or theories that discuss this topic in depth?', '2022-07-28 15:41:09', '2022-07-28 15:44:43', 0),
(2, 2, 'Could you share recommendations for lesser-known travel destinations that provide distinctive and unconventional experiences?', 'Having visited popular tourist destinations, I want to explore more unconventional places. Can you suggest some off-the-beaten-path travel destinations that offer unique experiences? I\'m particularly interested in places with rich cultural heritage and natural beauty.', '2022-07-29 12:34:52', NULL, 0),
(3, 2, 'How has technology influenced modern art creation and appreciation?', 'I\'ve noticed a shift in the art world with the rise of digital media and technology. How has technology impacted the way artists create and audiences appreciate art in the modern era?\r\n', '2022-07-30 09:13:24', NULL, 0),
(4, 3, 'Can you recommend a unique and easy-to-make pasta recipe for someone with limited cooking skills?', 'I love pasta but struggle with complicated recipes. I\'m looking for something delicious yet simple to prepare. Any ideas?', '2022-07-31 15:17:58', NULL, 0),
(5, 1, 'In what amusing or unexpected way has technology made your life easier?', 'Recognizing technology\'s surprising nature, can you share a humorous or unexpected story about how a piece of technology unexpectedly made your life easier or more entertaining?\r\n', '2022-08-03 05:14:07', NULL, 0),
(6, 3, 'For individuals seeking a new and fulfilling pastime with minimal barriers to entry, could you kindly suggest an easy and enjoyable hobby?', 'Wanting to explore a new hobby but not knowing where to start, can someone suggest a beginner-friendly hobby that\'s both easy to pick up and brings joy?', '2022-08-03 23:16:15', NULL, 0),
(7, 4, 'Can you recommend some thought-provoking books on existential philosophy?', 'Having recently become interested in existential philosophy, I would like to explore the topic further through books. Are there any titles or authors you would recommend for someone new to this philosophical branch?', '2022-08-06 20:45:03', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(60) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `users`:
--

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `image`, `created_at`) VALUES
(1, 'hermione', 'hermionegranger@email.com', '$2a$10$FuzvQXKSXlzO3d0Rl5rxUuTT5Gyl7stscnAlC0pkt6MvNdU06p8i6', 'https://iili.io/HXg0Nn9.webp', '2022-07-27 11:19:38'),
(2, 'lovegood', 'lunalovegood@email.com', '$2a$10$a5PqecYTunqCVWUllJwpFeWIcDnLZft/I03eTwZDhao2i4ydOHtkK', 'https://iili.io/HXg0e6u.webp', '2022-07-27 11:20:04'),
(3, 'bellatrix', 'bellatrixlestrange@email.com', '$2a$10$fZVqmEfjFNaMejfej71AfOvteKUSgJDml/zRrcTSET4X3pNsq5HrC', 'https://iili.io/HXg0OGe.webp', '2022-07-27 11:20:26'),
(4, 'petunia', 'petuniadursley@email.com', '$2a$10$9u1xC9gvZktAJTZVXcTPNuFS7sSk494eKR8guMS7dTLDTao5XmM9a', 'https://iili.io/HXg0jZ7.webp', '2022-07-27 11:20:41');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`answer_id`),
  ADD KEY `fk_userAnswer` (`user_id`),
  ADD KEY `fk_questionAnswer` (`question_id`);

--
-- Indexes for table `answers_votes`
--
ALTER TABLE `answers_votes`
  ADD PRIMARY KEY (`vote_id`),
  ADD KEY `fk_userVote` (`user_id`),
  ADD KEY `fk_answerVote` (`answer_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`question_id`),
  ADD KEY `fk_userQuestion` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `answer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `answers_votes`
--
ALTER TABLE `answers_votes`
  MODIFY `vote_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `fk_questionAnswer` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_userAnswer` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `answers_votes`
--
ALTER TABLE `answers_votes`
  ADD CONSTRAINT `fk_answerVote` FOREIGN KEY (`answer_id`) REFERENCES `answers` (`answer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_userVote` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `fk_userQuestion` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
