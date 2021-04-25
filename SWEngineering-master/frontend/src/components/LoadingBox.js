/* 인터넷이 느릴 경우의 로딩 표현을 위함 */

import React from 'react';

export default function LoadingBox() {
    return(
        <div className="loading">
            <i className="fa fa-spinner fa-spin"></i> Loading...
        </div>
    );
}