-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 03, 2022 at 09:15 PM
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
-- Database: `ca_forum`
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
(1, 4, 1, 'There is a new useHistory hook in React Router >5.1.0 if you are using React >16.8.0 and functional components.\r\n\r\nimport { useHistory } from \"react-router-dom\";\r\n\r\nfunction HomeButton() {\r\n  const history = useHistory();\r\n\r\n  function handleClick() {\r\n    history.push(\"/home\");\r\n  }\r\n\r\n  return (\r\n    <button type=\"button\" onClick={handleClick}>\r\n      Go home\r\n    </button>\r\n  );\r\n}', '2022-07-28 15:41:09', '2022-08-03 05:03:37', 0),
(2, 4, 1, 'You can use the new useNavigate hook. useNavigate hook returns a function which can be used for programmatic navigation. Example from the react router documentaion\n\nimport { useNavigate } from \"react-router-dom\";', '2022-07-28 15:41:09', '2022-08-02 12:46:58', 0),
(3, 4, 3, 'That\'s property spread notation. It was added in ES2018 (spread for arrays/iterables was earlier, ES2015), but it\'s been supported in React projects for a long time via transpilation (as \"JSX spread attributes\" even though you could do it elsewhere, too, not just attributes).', '2022-07-28 15:41:09', NULL, 0),
(4, 1, 1, '<img src={FileSVG} />\nMake sure to check if your path it is correct too', '2022-08-02 10:40:30', NULL, 0),
(5, 3, 3, 'If you don\'t already have an array to map(), and want to inline this so the source layout corresponds to the output closer. With ES2015 (ES6) syntax (spread and arrow functions)', '2022-08-02 10:40:30', NULL, 0),
(6, 1, 1, 'I always like to import the SVG in the top of the file, like this', '2022-08-02 10:40:45', '2022-08-03 19:11:19', 0);
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
(1, 1, 3, 1),
(2, 2, 3, -1),
(3, 1, 2, -1),
(4, 2, 2, -1),
(5, 2, 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `question_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
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
(1, 1, 'Programmatically navigate using React router', 'With react-router I can use the Link element to create links which are natively handled by react router.\n\nI see internally it calls this.context.transitionTo(...).\nhgj', '2022-07-28 15:41:07', '2022-08-03 16:40:33', 0),
(2, 2, 'Loop inside React JSX', 'I\'m trying to do something like the following in React JSX (where ObjectRow is a separate component):\r\n\r\n<tbody>\r\n    for (var i=0; i < numrows; i++) {\r\n        <ObjectRow/>\r\n    } \r\n</tbody>', '2022-07-28 15:41:08', NULL, 0),
(3, 2, 'What are these three dots in React doing?', 'What does the ... do in this React (using JSX) code and what is it called?\r\n\r\n<Modal {...this.props} title=\'Modal heading\' animation={false}>', '2022-07-28 15:41:09', NULL, 0),
(4, 3, 'What is the difference between React Native and React?', 'I have started to learn React out of curiosity and wanted to know the difference between React and React Native - though could not find a satisfactory answer using Google. React and React Native seems to have the same format. Do they have completely different syntax??', '2022-07-28 15:41:10', NULL, 0),
(5, 1, 'Compiling LibGDX on Android with Jvdroid', 'df2 = pd.DataFrame(data={\'val1\': [1, 3, 3, 0], \n                         \'val2\': [5, 2, 2, 4], \n                         \'val3\': [5, 5, 3, 0]},\n                   index=pd.Series([1, 2, 3, 4], name=\'index\'))', '2022-08-03 05:14:07', NULL, 0),
(6, 3, 'I always like to import the SVG in the top of the file, like this:  import FileSVG from \"./file.svg\"; and then use it as value for the src prop, like this:  <img src={FileSVG} /> Make sure to check if your path it is correct too!', 'I always like to import the SVG in the top of the file, like this:\n\nimport FileSVG from \"./file.svg\";\nand then use it as value for the src prop, like this:\n\n<img src={FileSVG} />\nMake sure to check if your path it is correct too!', '2022-08-03 05:16:15', '2022-08-03 19:07:27', 0),
(7, 4, 'What is the difference between React Native and React?', 'I have started to learn React out of curiosity and wanted to know the difference between React and React Native - though could not find a satisfactory answer using Google. React and React Native seems to have the same format. Do they have completely different syntax??', '2022-08-03 05:45:13', NULL, 0);

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
(1, 'hermione', 'hermionegranger@email.com', '$2a$10$FuzvQXKSXlzO3d0Rl5rxUuTT5Gyl7stscnAlC0pkt6MvNdU06p8i6', 'https://placeimg.com/100/100/people', '2022-07-27 11:19:38'),
(2, 'lovegood', 'lunalovegood@email.com', '$2a$10$a5PqecYTunqCVWUllJwpFeWIcDnLZft/I03eTwZDhao2i4ydOHtkK', 'https://placeimg.com/100/100/people', '2022-07-27 11:20:04'),
(3, 'bellatrix', 'bellatrixlestrange@email.com', '$2a$10$fZVqmEfjFNaMejfej71AfOvteKUSgJDml/zRrcTSET4X3pNsq5HrC', 'https://placeimg.com/100/100/people', '2022-07-27 11:20:26'),
(4, 'petunia', 'petuniadursley@email.com', '$2a$10$9u1xC9gvZktAJTZVXcTPNuFS7sSk494eKR8guMS7dTLDTao5XmM9a', 'https://placeimg.com/100/100/people', '2022-07-27 11:20:41');

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
  MODIFY `answer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `answers_votes`
--
ALTER TABLE `answers_votes`
  MODIFY `vote_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
