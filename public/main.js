function ResourceItem({ name, length }) {
  if (name === "protected_resources") return;

  return `
      <li>
        <a href="${name}">/${name}</a>
        <sup>${length ? `${length}x` : "object"}</sup>
      </li>
    `;
}

function ResourceList({ db }) {
  return `
      <ul>
        ${Object.keys(db)
          .map((name) =>
            ResourceItem({
              name,
              length: Array.isArray(db[name]) && db[name].length,
            })
          )
          .join("")}
      </ul>
    `;
}

function NoResources() {
  return `<p>No resources found</p>`;
}

function ResourcesBlock({ db }) {
  return `
      <div>
        <h1>Resources</h1>
        ${Object.keys(db).length ? ResourceList({ db }) : NoResources()}
      </div>
    `;
}

window
  .fetch("db")
  .then((response) => response.json())
  .then(
    (db) =>
      (document.getElementById("resources").innerHTML = ResourcesBlock({ db }))
  );
$('.add-student').click(function () {
    $('header').addClass("hide");
    $('.form-add').addClass('show');
});
$('.back').click(function () {
    $('.form-add').removeClass('show');
    $('header').removeClass('hide');
    $('header').addClass("show");
});
$('.save').click(function () {
    let name = $('#name').val();
    let birthday = $('#birthday').val();
    let email = $('#email').val();
    let phone = $('#phone').val();
    if (_.isEmpty(name)) {
        $('#name-error').text('Thông tin không chính xác')
    } else if (name.trim().length <= 2) {
        $('#name-error').text('Vui lòng nhập tên từ 2 kí tự trở lên')
    } else if (name.trim().length > 50) {
        $('#name-error').text('Dữ liệu quá dài')
    }
    else {
        $('#name-error').text('')
    }
    if (_.isEmpty(birthday)) {
        $('#birthday-error').text('Bạn chưa nhập ngày sinh')
    }
    else {
        $('#ngaysinh-error').text('')
    }
    if (_.isEmpty(phone)) {
        $('#phone-error').text('Vui lòng nhập số điện thoại')
    }
    else {
        $('#ngaysinh-error').text('')
    }
});
