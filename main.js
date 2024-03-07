var personalInfo = {};
var surveyResults = {};

function startSurvey() {
    var fullname = document.getElementById('fullname').value;
    var dob = document.getElementById('dob').value;
    var cccd = document.getElementById('cccd').value;
    var address = document.getElementById('address').value;

    if (fullname === "" || dob === "" || cccd === "" || address === "") {
        alert('Vui lòng điền đầy đủ thông tin cá nhân trước khi bắt đầu khảo sát.');
    } else {
        personalInfo = {
            fullname: fullname,
            dob: dob,
            cccd: cccd,
            address: address
        };
        document.getElementById('personal-info-form').style.display = 'none';
        document.getElementById('survey-questions').style.display = 'block';

        // Nhóm 1: Lựa chọn đúng/sai
        var group1 = document.getElementById('group1');
        for (var i = 1; i <= 10; i++) {
            var question = document.createElement('div');
            question.innerHTML = '<p>Câu hỏi ' + i + ': Đây là câu hỏi lựa chọn đúng/sai?</p>' +
                '<label><input type="radio" name="group1_q' + i + '" value="true">Đúng</label>' +
                '<label><input type="radio" name="group1_q' + i + '" value="false">Sai</label>';
            group1.appendChild(question);
        }

        // Nhóm 2: Chọn 1 trong 4 đáp án
        var group2 = document.getElementById('group2');
        for (var i = 1; i <= 10; i++) {
            var question = document.createElement('div');
            question.innerHTML = '<p>Câu hỏi ' + i + ': Chọn một trong bốn đáp án sau:</p>' +
                '<label><input type="radio" name="group2_q' + i + '" value="A">A</label>' +
                '<label><input type="radio" name="group2_q' + i + '" value="B">B</label>' +
                '<label><input type="radio" name="group2_q' + i + '" value="C">C</label>' +
                '<label><input type="radio" name="group2_q' + i + '" value="D">D</label>';
            group2.appendChild(question);
        }

        // Nhóm 3: Chọn nhiều đáp án
        var group3 = document.getElementById('group3');
        for (var i = 1; i <= 10; i++) {
            var question = document.createElement('div');
            question.innerHTML = '<p>Câu hỏi ' + i + ': Chọn một hoặc nhiều đáp án sau:</p>' +
                '<label><input type="checkbox" name="group3_q' + i + '" value="A">A</label>' +
                '<label><input type="checkbox" name="group3_q' + i + '" value="B">B</label>' +
                '<label><input type="checkbox" name="group3_q' + i + '" value="C">C</label>' +
                '<label><input type="checkbox" name="group3_q' + i + '" value="D">D</label>';
            group3.appendChild(question);
        }

        // Nhóm 4: Trả lời tự luận
        var group4 = document.getElementById('group4');
        for (var i = 1; i <= 10; i++) {
            var question = document.createElement('div');
            question.innerHTML = '<p>Câu hỏi ' + i + ': Trả lời tự luận:</p>' +
                '<textarea name="group4_q' + i + '" rows="2" cols="50"></textarea>';
            group4.appendChild(question);
        }
    }
}

function submitSurvey() {
    // Kiểm tra biến personalInfoComplete
    if (Object.keys(personalInfo).length === 0) {
        alert('Vui lòng nhập đầy đủ thông tin cá nhân trước khi hoàn thành khảo sát.');
    } else {
        // Kiểm tra xem tất cả các nhóm câu hỏi đã được hoàn thành chưa
        var isGroup1Complete = isGroupComplete('group1');
        var isGroup2Complete = isGroupComplete('group2');
        var isGroup3Complete = isGroupComplete('group3');
        var isGroup4Complete = isGroupComplete('group4');

        // Tính toán số câu hỏi hoàn thành và chưa hoàn thành
        var totalQuestions = 40;
        var completedQuestions = (isGroup1Complete ? 10 : 0) + (isGroup2Complete ? 10 : 0) + (isGroup3Complete ? 10 : 0) + (isGroup4Complete ? 10 : 0);
        var remainingQuestions = totalQuestions - completedQuestions;

        // Lưu thông tin kết quả khảo sát
        surveyResults = {
            totalQuestions: totalQuestions,
            completedQuestions: completedQuestions,
            remainingQuestions: remainingQuestions
        };

        // Tạo kết quả dựa trên dữ liệu
        var resultMessage = "Cảm ơn bạn " + personalInfo.fullname + " đã hoàn thành khảo sát!\n";
        resultMessage += "Thông tin cá nhân:\n";
        resultMessage += "Họ và tên: " + personalInfo.fullname + "\n";
        resultMessage += "Ngày tháng năm sinh: " + personalInfo.dob + "\n";
        resultMessage += "CCCD: " + personalInfo.cccd + "\n";
        resultMessage += "Địa chỉ thường trú: " + personalInfo.address + "\n";
        resultMessage += "Kết quả khảo sát:\n";
        resultMessage += "Số câu hỏi đã hoàn thành: " + surveyResults.completedQuestions + "\n";
        resultMessage += "Số câu hỏi chưa hoàn thành: " + surveyResults.remainingQuestions + "\n";

        // Ẩn đi phần khảo sát
        document.getElementById('survey-questions').style.display = 'none';
        document.getElementById('personal-info-form').style.display = 'none';

        // Hiển thị kết quả
        document.getElementById('result-container').style.display = 'block';
        document.getElementById('result-message').innerText = resultMessage;
    }
}

function isGroupComplete(groupId) {
    // Lấy tất cả các input trong nhóm câu hỏi
    var groupInputs = document.querySelectorAll('#' + groupId + ' input');
    // Kiểm tra xem tất cả các input có giá trị không
    for (var i = 0; i < groupInputs.length; i++) {
        if (groupInputs[i].value === "") {
            return false;
        }
    }

    // Nếu không có input nào thiếu giá trị, nhóm được coi là hoàn thành
    return true;
}