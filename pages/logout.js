import React from 'react';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';

export default function LogoutPage(props) {

}

export async function getServerSideProps(ctx) {
    const cookies = nookies.get(ctx);
    const token = cookies.USER_TOKEN;
    const decodedToken = jwt.decode(token);
    const githubUser = decodedToken?.githubUser;
    
    nookies.destroy(ctx, 'USER_TOKEN');
    

    if (!githubUser) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    } else {
        
        return {
            redirect: {
              destination: '/',
              permanent: false,
            },
          }
    }
  
    // const followers = await fetch(`https://api.github.com/users/${githubUser}/followers`)
    //   .then((res) => res.json())
    //   .then(followers => followers.map((follower) => ({
    //     id: follower.id,
    //     name: follower.login,
    //     image: follower.avatar_url,
    //   })));
  
    return {
      props: {
        githubUser,
      }
    }
  }