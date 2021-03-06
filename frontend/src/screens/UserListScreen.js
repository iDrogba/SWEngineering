import React, { useEffect } from 'react';
 import { useDispatch, useSelector } from 'react-redux';
 import { deleteUser,listUsers } from '../actions/userActions';
 import LoadingBox from '../components/LoadingBox';
 import MessageBox from '../components/MessageBox';
 import { USER_DETAILS_RESET } from '../constants/userConstants';

 export default function UserListScreen(props) {
   const userList = useSelector((state) => state.userList);
   const { loading, error, users } = userList;

   const userDelete = useSelector((state) => state.userDelete);
   const {
     loading: loadingDelete,
     error: errorDelete,
     success: successDelete,
   } = userDelete;

   const dispatch = useDispatch();
   useEffect(() => {
     dispatch(listUsers());
     dispatch({
        type: USER_DETAILS_RESET,
      });
    }, [dispatch, successDelete]);
    const deleteHandler = (user) => {
      if (window.confirm('정말 삭제하시겠습니까?')) {
        dispatch(deleteUser(user._id));
      }
    };
   return (
     <div className="userlist">
       <h1>회원 목록</h1>
       {loadingDelete && <LoadingBox></LoadingBox>}
       {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
       {successDelete && (
         <MessageBox variant="success">회원이 성공적으로 삭제되었습니다.</MessageBox>
       )}
       {loading ? (
         <LoadingBox></LoadingBox>
       ) : error ? (
         <MessageBox variant="danger">{error}</MessageBox>
       ) : (
         <table className="table">
           <thead>
             <tr>
               <th>회원번호</th>
               <th>이름</th>
               <th>이메일</th>
               <th>IS SELLER</th>
               <th>관리자 여부</th>
               <th>기타</th>
             </tr>
           </thead>
           <tbody>
             {users.map((user) => (
               <tr key={user._id}>
                 <td>{user._id}</td>
                 <td>{user.name}</td>
                 <td>{user.email}</td>
                 <td>{user.isSeller ? 'YES' : ' NO'}</td>
                 <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                 <td>
                 <button
                     type="button"
                     className="small"
                     onClick={() => props.history.push(`/user/${user._id}/edit`)}
                   >
                     편집
                   </button>
                   <button
                     type="button"
                     className="small"
                     onClick={() => deleteHandler(user)}
                   >
                     삭제
                   </button>
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       )}
     </div>
   );
 }