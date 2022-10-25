# dora3
Dora is a social Question and Anwswer web app, where users post questions and other users answer them. But why use Dora? Unlike other web app where you are blocked from viewing their content unless you sign up, Dora lets everyone access its content without making an account! However if users want to add a question or answer somone elses question then they will need to make an account. (Dora is currently in its 3rd evolution)

**link to project:** no live demo yet

<img src="dora3.gif" width="100%">

![DORA](https://i.ibb.co/0QP9d6T/dora01.png)

![DORA User Question](https://i.ibb.co/wSqKpWS/dora04.png)

## How It's Made:

**Tech used:** HTML, CSS, Javascript, EJS, Node.js, MongoDB, Mongoose, Cloudinary, Passport, Bcrypt, Express, Morgan, Multer

The first step I took to build Dora was to make...Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab odio eum voluptate hic asperiores voluptatum et laborum nulla assumenda in suscipit pariatur ratione, voluptates dolor maiores nisi dolorem eius nemo! Non cupiditate nihil tenetur illum facilis magni porro sunt aperiam maiores et corrupti, eaque sed, veritatis quasi, officia laboriosam aliquam eligendi fugiat enim dignissimos soluta!

## Optimizations

I love the look of a white background so I decided to go with that. I wanted users to access the whole web app without an account so I made sure to make the homepage auth free as well individual questions. Users have the choice of either asking a question with text only or they can upload an image. If users do not like a question they see on the homepage then they have the ability to click an angry font awesome icon. Users can only like a post once and they can take back their like if they want to. Feature I will add to Dora eventually -> the ability for users to upload a profile picture and have it displayed on their questions and answers, like feature on answers, a 'trending'/'newest' button on homepage/feed, more ways to login/signup using google auth/ twitter auth/ reddit auth and others, and a favorites feature where users can favorite other user's questions. I am currently working on an Edit feature where users can edit their questions.

## Lessons Learned:

I had trouble with making the orginial poster's username appear on their post but learned about .populate() and that fixed the issue. I then had the same issue with displaying usernames on answer post but this time .populate() did not fix it so I went into the Answers model and I added a userName property and that fixed the issue. Another issue was the ability to upload a question without an image becuase originally my code only let users ask a question with an image, it was required they had an image to post. I wanted users to post without an image if they wanted so I changed the image and cloudinary requirement from true to false in the Post Model. Then in the post controller, createPost, I added an if() statement which solved the issue. Other lessons I learned are how to have users like only once/take it back, and making the header change once a user logged in, so that it displays buttons to logout/add a question/or go to their profile.

## Examples:
Take a look at these few examples that I have in my own portfolio:

**Couch to 5k:** https://github.com/leandro-alba/c25k

**Happy Notes:** https://github.com/leandro-alba/happy-notes

**MVC lecture:** https://github.com/leandro-alba/simple-express-app-submission
