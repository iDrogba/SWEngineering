/* 로그인 화면 구현 */

import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            alert('두 비밀번호가 동일하지 않습니다.')
        } else {
            dispatch(register(name, email, password));
        }
    };
    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>계정 만들기</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">이름</label>
                    <input 
                        type="text" 
                        id="name" 
                        placeholder="Enter name" 
                        required
                        onChange={ e => setName(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="email">이메일 주소</label>
                    <input 
                        type="email" 
                        id="email" 
                        placeholder="Enter email" 
                        required
                        onChange={ e => setEmail(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="Enter password" 
                        required
                        onChange={ e => setPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="confirmpassword">비밀번호 확인</label>
                    <input 
                        type="password" 
                        id="confirmpassword" 
                        placeholder="Enter confirm password" 
                        required
                        onChange={ e => setConfirmPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">
                        등록
                    </button>
                </div>
                <div>
                    <label />
                    <div>
                        이미 계정이 있나요? {' '} 
                        <Link to={`/signin?redirect=${redirect}`}>로그인</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}