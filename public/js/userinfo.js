document.addEventListener("DOMContentLoaded", function () {
    let currentPage = 1; // 현재 페이지 초기값 설정

    // 서버로부터 전체 페이지 수를 받아오는 함수
    function getTotalPages() {
        fetch(`/totalPages`)
            .then(response => response.json())
            .then(data => {
                displayPagination(data.totalPages); // 전체 페이지 수를 받아와서 페이징 버튼을 생성합니다.
            })
            .catch(error => console.error("Error fetching total pages: ", error));
    }

    // 데이터를 불러오고 화면에 표시하는 함수
    function infodata(page) {
        fetch(`/a?page=${page}`)
            .then(response => response.json())
            .then(data => {
                const tableBody = document.getElementById('data_body');
                tableBody.innerHTML = '';
                data.forEach(item => {
                    const [year, month, day, hours, minutes, seconds] = parseDateTime(item.daytime);
                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td>${year}-${month}-${day} ${hours}:${minutes}:${seconds}</td>
                        <td>${item.theme}</td>
                        <td>${item.name}</td>
                        <td>${item.pnum}</td>
                        <td>${item.agreement}</td>`;
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

    getTotalPages(); // 페이지가 로드될 때 전체 페이지 수를 불러옵니다.
    infodata(currentPage); // 페이지가 로드될 때 첫 번째 페이지의 데이터를 불러옵니다.
});