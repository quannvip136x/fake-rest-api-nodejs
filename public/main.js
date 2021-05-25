    $('.add-student').click(function () {
        $('main').addClass("hide");
        $('.form-add').addClass('show');
    });
    $('.back').click(function () {
        $('.form-add').removeClass('show');
        $('main').removeClass('hide');
        $('main').addClass("show");
        $('.form-edit').removeClass('show');

    });
    let isEmailAddress = email => {
        return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email) || /w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*/.test(email);
    }
    let courseApi = 'https://shadowboiz.herokuapp.com/users';
    function loadDocJQuery() {
        $.ajax(courseApi, {
            method: "GET"
        }).done(function (users) {
            let content = "";

            for (let i = 0; i < users.length; i++) {
                const user = users[i];
                content += `<tr>
                <td>${user.name}</td>
                <td>${user.birthday}</td>
                <td>${user.email}</td>
                <td>${user.phone} </td>
                <td class="fix-student">
                            <div onclick=editor() class="edit">
                                <i class="fas fa-edit"></i>
                                <span >Chỉnh sửa</span>
                            </div>
                            <div class="border-a"></div>
                            <div class="delete" onclick=deleteEdit(${user.id})>
                                <i class="far fa-trash-alt"></i>
                                <span>Xóa</span>
                            </div>
                        </td>
                </tr>`;
            }
            $("#table-users").html(content);
        });
    }
    $(function () {
        loadDocJQuery();
    });


    $('.save').click(function () {
        let name = $('#name').val();
        let birthday = $('#birthday').val();
        let email = $('#email').val();
        let phone = $('#phone').val();
        // let isValidate = true;
        if (name === "" || name.length <= 2 || name.length > 50 || birthday === "" || !isEmailAddress(email) ||email === "" || phone === "") {
            if (_.isEmpty(name)) {
                name = ""
                $('#name-error').text('Vui lòng nhập họ và tên')
            } else if (name.trim().length <= 2 ||name.trim().length > 50) {
                name = ""
                $('#name-error').text('Họ và tên lớn hơn 2 và nhỏ hơn 50 kí tự')
            }
            else{
                $('#name-error').text("");
            }
            if (_.isEmpty(birthday)) {
                birthday = ''
                $('#birthday-error').text('Vui lòng nhập Ngày tháng năm sinh')
            }
            else{
                $('#birthday-error').text("");
            }
            if (_.isEmpty(email)) {
                email = ''
                $('#email-error').text('Vui lòng nhập Email')
            } else if (!isEmailAddress(email)) {
                email = ''
                $('#email-error').text('Sai Định dạng')
            }
            else{
                $('#email-error').text("");
            }
            if (_.isEmpty(phone)) {
                phone = ''
                $('#phone-error').text('Vui lòng nhập Số điện thoại')
            }
            else{
                $('#phone-error').text("");
            }

        } else {
            let agrs = {
                url: courseApi,
                type: "POST",
                data: {
                    name: name,
                    birthday: birthday,
                    email: email,
                    phone: phone
                },
            };
            $.ajax(agrs).done(function () {
                for (let i = 0; i < data.length; i++) {
                    result += `<tr>
                        <td>${data[i].name}</td>
                        <td>${data[i].birthday}</td>
                        <td>${data[i].email}</td>
                        <td>${data[i].phone} </td>
                        <td class="fix-student">
                                    <div onclick=edit() class="edit">
                                        <i class="fas fa-edit"></i>
                                        <span >Chỉnh sửa</span>
                                    </div>
                                    <div class="border-a"></div>
                                    <div class="delete" onclick=deleteEdit(${user.id})>
                                        <i class="far fa-trash-alt"></i>
                                        <span>Xóa</span>
                                    </div>
                                </td>
                        </tr>`;

                    document.getElementById('#table-users').innerHTML = result
                }
            });
            alert("Bạn đã tạo thành công");
            location.reload();
        }
        
    });


    function edit() {
        $('header').addClass('hide');
        $('.form-edit').addClass('show');
    }

    function deleteEdit(id) {

        let formData = {
            method: 'DELETE',
            Headers: {
                'Content-Type': 'application/json'
            },
        };
        fetch(courseApi + '/' + id, formData)
            .then(function () {
                loadDocJQuery();
            });

    }
