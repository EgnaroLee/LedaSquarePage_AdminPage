function getRecentData() {
    fetch('/recentData')
        .then(response => response.json())
        .then(data => {
            // 데이터를 테이블에 추가
            const tableBody = document.getElementById('recent_data_body');
            tableBody.innerHTML = '';

            data.forEach(item => {
                const dateTime = new Date(item.daytime);

                // 날짜 시간 변경
                const formattedDateTime = `${dateTime.getFullYear()}-${padZero(dateTime.getMonth() + 1)}-${padZero(dateTime.getDate())} ${padZero(dateTime.getHours())}:${padZero(dateTime.getMinutes())}:${padZero(dateTime.getSeconds())}`;

                // 전화번호 입력 후 표시 변경
                const formattedPnum = formatPhoneNumber(item.pnum);

                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${formattedDateTime}</td>
                <td>${item.theme}</td>
                <td>${item.name}</td>
                <td>${formattedPnum}</td>
                <td>${item.agreement ? 'O' : ''}</td>
            `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching recent data:', error);
        });
}

// 페이지 로드 시 최근 데이터 조회
window.onload = function () {
    getRecentData();
};

// 숫자를 두 자리로 맞추기 위한 함수
function padZero(num) {
    return num.toString().padStart(2, '0');
}

// 전화번호 형식 변경 함수
function formatPhoneNumber(pnum) {
    const regex = /^(\d{3})(\d{4})(\d{4})$/;
    const match = pnum.match(regex);
    if (match) {
        return `${match[1]}-${match[2]}-${match[3]}`;
    } else {
        return pnum;
    }
}