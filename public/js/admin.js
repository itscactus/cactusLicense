function searchUser() {
    let userToSearch = $('#user__Search').val()
    $.ajax({
        method: "POST",
        url: "/api/users/search",
        data: {
            string: userToSearch
        },
        success: function(res) {
            $('#search__Number__Found').text(res.length)
            $('#search__Input').text(userToSearch)
            if(res.length >= 1) {
                $('#body__Content').addClass('hidden');
                $('#search__Content').removeClass('hidden');
                let content = ''
                res.map((user) => { 
                    content = content + `
<tr class="">
    <td class="w-2/12 text-center mx-auto flex flex-row items-center justify-center gap-2">
        <img class="w-8 h-8 rounded-full" alt="User Profile" src="https://cdn.discordapp.com/avatars/${user.userId}/${user.avatar}.png" />
        <p>${user.username}</p>
    </td>
    <td class="w-2/12 text-center">${user.email}</td>
    <td class="w-4/12 text-center">0</td>
    <td class="w-6/12 text-center">${user.userId}</td>
    <td class="w-3/12 text-center">
        <button class="text-white p-2 rounded-full bg-green-500 duration-300 transition-colors hover:bg-green-600/80" onclick="window.location = '/admin/users/${user.userId}'"><i class="fa-solid fa-edit"></i></button>
    </td>
<tr>
                    `;
                    $('#users__Search__Table>tbody').html(content)
                })
            } else {
                $('#body__Content').removeClass('hidden');
                $('#search__Content').addClass('hidden');
                alert("No result found.");
            }
        }
    })
}

function dropdown(str) {
    $("#submenu-" + str).toggle("hidden");
    $("#arrow-" + str).toggleClass("rotate-0");
}

function openSidebar() {
    $(".sidebar").toggleClass("translate-x-[-100%]");
}