let table = document.getElementById("table");
let btn = document.getElementById("btn");

//fetchig user data 
const getUsers = async function () {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

//getting posts with user id
const getPosts = async function (id) {
  try {
    let response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}/posts`
    );
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// btn on-cick 
btn.addEventListener("click",async () => {
  const users = await getUsers();
  for (const user of users) {
    const posts = await getPosts(user.id);
    table.append(generateRow(user,posts));
  }

});

// function to make rows and fill them with user data and posts
const generateRow= (user,posts) =>
{
   let row= document.createElement("tr");
   let username= document.createElement("td");
   let email=document.createElement("td");
   let companyname=document.createElement("td");
   let address=document.createElement("td");
   let postss=document.createElement("td");
   username.innerText=user.username;
   email.innerText=user.email;
   companyname.innerText=user.company.name;
   address.innerText="lat: "+user.address.geo.lat+" ,long: "+user.address.geo.lng;
   let list=document.createElement("ul");
   
   for(const post of posts)
   {
    let ul =document.createElement("li");
    ul.innerText=post.title;
    list.append(ul);
   }
   //appending list and record into rows
   postss.append(list);
   row.append(username);
   row.append(email);
   row.append(companyname);
   row.append(address);
   row.append(postss);
   return row;


}