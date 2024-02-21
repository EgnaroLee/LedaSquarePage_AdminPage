
document.addEventListener("DOMContentLoaded", function () {
    let currentPage = 1; // 현재 페이지 초기값 설정
    const itemsPerPage = 8;
    // 서버로부터 전체 페이지 수를 받아오는 함수
    function getTotalPages() {
        fetch(`/totalPages`)
            .then(response => response.json())
            .then(data => {
                displayPagination(data.totalPages); // 전체 페이지 수 받아와 버튼 생성
            })
            .catch(error => console.error("Error fetching total pages: ", error));
    }

    // 데이터를 불러오고 화면에 표시하는 함수
    function infodata(page) {
        const offset = (page - 1) * itemsPerPage;
        fetch(`/a?page=${page}`)
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) => new Date(b.daytime) - new Date(a.daytime)); // 데이터를 최신순으로 정렬

                const tableBody = document.getElementById('data_body');
                tableBody.innerHTML = '';
                const itemsToShow = data.slice(offset, offset + itemsPerPage);
                itemsToShow.forEach(item => {

                    // 날짜 시간 형식 변경
                    const [year, month, day, hours, minutes, seconds] = parseDateTime(item.daytime);

                    // 전화번호 형식 변경
                    const formattedPnum = formatPhoneNumber(item.pnum);

                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td>${year}-${month}-${day} ${hours}:${minutes}:${seconds}</td>
                        <td>${item.theme}</td>
                        <td>${item.name}</td>
                        <td>${formattedPnum}</td>
                        <td>${item.agreement ? 'O' : ''}</td>`;
                    tableBody.appendChild(row);
                });
                currentPage = page; // 현재 페이지 갱신
            })
            .catch(error => console.error("Error fetching data: ", error));
    }

    // 날짜 및 시간 데이터 가져와 표시
    function parseDateTime(dateTimeString) {
        const dateTime = new Date(dateTimeString);
        const year = dateTime.getFullYear();
        const month = String(dateTime.getMonth() + 1).padStart(2, '0');
        const day = String(dateTime.getDate()).padStart(2, '0');
        const hours = String(dateTime.getHours()).padStart(2, '0');
        const minutes = String(dateTime.getMinutes()).padStart(2, '0');
        const seconds = String(dateTime.getSeconds()).padStart(2, '0');
        return [year, month, day, hours, minutes, seconds];
    }

    // 페이징 버튼을 생성하는 함수
    function displayPagination(totalPages) {
        const paginationContainer = document.getElementById('paging_btn');
        paginationContainer.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.addEventListener('click', () => {
                infodata(i);
            });
            paginationContainer.appendChild(button);
        }
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


    getTotalPages(); // 페이지 로드 시 전체 페이지 수 불러오기
    infodata(currentPage); // 페이지 로드 시 첫 번째 페이지 데이터 불러오기
});
