$.ajax({
    url: '/api/products',
    method: 'GET',
    success: function(res) {
        $('#product__Number').text(res.length);
        let content = '';
        res.map((prd) => {
            data = prd.data;
            content = content + `
<tr class="">
    <td class="w-2/12 text-center mx-auto">
        <p>${data.name}</p>
    </td>
    <td class="w-2/12 text-center mx-auto">
        <img src="${data.thumbnail}" class="mx-auto w-20 h-18 max-w-20 max-h-18" alt="thumbnail" />
    </td>
    <td class="w-4/12 text-center">
        <img src="${data.iconURL}" class="mx-auto w-8 h-8 max-w-8 max-h-8" alt="iconURL" />
    </td>
    <td class="w-4/12 text-center">${data.price} $</td>
    <td class="w-2/12 text-center">${data.active ? 'Enabled' : 'Disabled'}</td>
    <td class="w-6/12 text-center">${data._id}</td>
    <td class="w-3/12 text-center">
        <button class="text-white p-2 rounded-full bg-green-500 duration-300 transition-colors hover:bg-green-600/80" onclick="window.location = '/admin/products/edit/${prd._id}'"><i class="fa-solid fa-edit"></i></button>
        <button class="text-white p-2 rounded-full bg-red-500 duration-300 transition-colors hover:bg-red-600/80" onclick="window.location = '/admin/products/delete/${prd._id}'"><i class="fa-solid fa-remove"></i></button>
    </td>
<tr>
            `
        })
        $('#product__Table>tbody').html(content);
    }
})
$("#form__Create__Product").submit(function(e) {
    e.preventDefault();
    let body = {
        name: $('#product__Name').val(),
        description: $('#product__Description').val(),
        thumbnail: $('#product__Thumbnail').val(),
        icon: $('#product__Icon').val(),
        price: $('#product__Price').val() != '' ? $('#product__Price').val() : 0,
        status: $('#product__Status').is(":checked"),
        version: $('#product__Version').val(),
        supportedVersions: $('#supported__Versions').val(),
        downloadUrl: $('#download__Url').val()
    }
    if(
        body.name.trim() == "" ||
        body.description.trim() == "" ||
        body.version.trim() == ""
    ) {
        $('#alert__Error').addClass('hidden');
        $('#alert__Success').addClass('hidden');
        $('#alert__Info').addClass('hidden');
        $('#alert__Box').removeClass('hidden');
        $('#alert__Warning').removeClass('hidden');
        $('#alert__Title').text('Warning')
        $('#alert__Message').text('Please fill the all inputs.')
        return;
    }
    $.ajax({
        url: '/api/products/create',
        method: 'POST',
        data: body,
        success: function(res) {
            $('#alert__Error').addClass('hidden');
            $('#alert__Warning').addClass('hidden');
            $('#alert__Info').addClass('hidden');
            $('#alert__Box').removeClass('hidden');
            $('#alert__Success').removeClass('hidden');
            $('#alert__Title').text('Product created')
            $('#alert__Message').text('The product created as success');
            setInterval(() => window.location = '/admin/products', 2000);
        }
    })
});
$("#form__Edit__Product").submit(function(e) {
    e.preventDefault();
    let body = {
        id: $('#product__Id').val(),
        name: $('#product__Name').val(),
        description: $('#product__Description').val(),
        thumbnail: $('#product__Thumbnail').val(),
        icon: $('#product__Icon').val(),
        price: $('#product__Price').val() != '' ? $('#product__Price').val() : 0,
        status: $('#product__Status').is(":checked"),
        version: $('#product__Version').val(),
        supportedVersions: $('#supported__Versions').val(),
        downloadUrl: $('#download__Url').val()
    }
    if(
        body.name.trim() == "" ||
        body.description.trim() == "" ||
        body.version.trim() == ""
    ) {
        $('#alert__Error').addClass('hidden');
        $('#alert__Success').addClass('hidden');
        $('#alert__Info').addClass('hidden');
        $('#alert__Box').removeClass('hidden');
        $('#alert__Warning').removeClass('hidden');
        $('#alert__Title').text('Warning')
        $('#alert__Message').text('Please fill the all inputs.')
        return;
    }
    $.ajax({
        url: '/api/products/edit',
        method: 'POST',
        data: body,
        success: function(res) {
            $('#alert__Error').addClass('hidden');
            $('#alert__Warning').addClass('hidden');
            $('#alert__Info').addClass('hidden');
            $('#alert__Box').removeClass('hidden');
            $('#alert__Success').removeClass('hidden');
            $('#alert__Title').text('Product created')
            $('#alert__Message').text('The product edited as success');
            setInterval(() => window.location = '/admin/products', 2000);
        }
    })
});