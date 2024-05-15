# Next.js Simple Blog Project

This project is a simple blog built using Next.js, Redux Toolkit, TypeScript, Firebase DB, and Zod Validation.

## Home Page

On the home page user can see all the posts that already exist. The posts are fetched from the db and stored it redux state. Each post may or may NOT have tags which it can be filtered by. Also user can navigate to page where it can create new post. On all pages except home page there is a link on the top right ot navigate to home page.

## Create Page

On the create page user can create new posts. The title and content are mandatory and go through validation, tags are not. After creating the post user is redirected to the home page. Post can not have the same title as the other post.

## Post Page

User can view post details. There he can see the content of the post, leave comments, edit or delete the post. Comment is done through a form with one mandatory field. After leaving a comment page immediately displays it. After deleting the post user is redirected to the home page.

## Edit Page

User can edit post info in form similar to the form that is used for post creation. After editing user gets redirected to the home page.  Post can not have the same title as the other post.
