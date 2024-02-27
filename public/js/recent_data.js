function infodata(page) {
    const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);
    const offset = (page - 1) * itemsPerPage;
    fetch(`/recentData`)
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => new Date(b.daytime) - new Date(a.daytime)); // 데이터를 최신순으로 정렬

            const tableBody = document.getElementById('recent_data_body');
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
 