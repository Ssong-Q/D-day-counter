const messageContainer = document.querySelector("#d-day-message");
const container = document.querySelector("#d-day-container");
const savedData = localStorage.getItem("saved-date");
const intervalIdArr = [];

container.style.display = "none";
messageContainer.innerHTML = "<h3>D-day를 입력해 주세요.</h3>";

const dateFormMaker = () => {
  const inputYear = document.querySelector("#target-year-input").value;
  const inputMonth = String(
    document.querySelector("#target-month-input").value
  ).padStart(2, "0");
  const inputDay = String(
    document.querySelector("#target-day-input").value
  ).padStart(2, "0");

  const dateFormat = `${inputYear}-${inputMonth}-${inputDay}`;
  return dateFormat;
};

const counterMaker = (data) => {
  if (data !== savedData) {
    localStorage.setItem("saved-date", data);
  }
  const nowDate = new Date();
  const targetDate = new Date(data).setHours(0, 0, 0, 0);
  // const exactTargetDate = targetDate - 9 * 60 * 60 * 1000;
  const remaining = (targetDate - nowDate) / 1000;
  // 만약, remaining이 0이라면, 타이머가 종료 되었습니다. 출력 (수도코드)
  if (parseFloat(remaining) <= 0) {
    messageContainer.innerHTML = "<h3>타이머가 종료되었습니다.</h3>";
    messageContainer.style.display = "flex";
    container.style.display = "none";
    setClearInterval();
    return;
  } else if (isNaN(remaining)) {
    // 만약, 잘못된 날짜가 들어왔다면, 유효한 시간대가 아닙니다. 출력
    messageContainer.innerHTML = "<h3>유효한 시간대가 아닙니다.</h3>";
    messageContainer.style.display = "flex";
    container.style.display = "none";
    setClearInterval();
    return;
  }

  const remainingObj = {
    remainingDays: Math.floor(remaining / 86400),
    remainingHours: Math.floor(remaining / 3600) % 24,
    remainingMins: Math.floor(remaining / 60) % 60,
    remainingSecs: Math.floor(remaining) % 60,
  };

  const format = (time) => {
    if (time < 10) {
      return "0" + time;
    } else {
      return time;
    }
  };

  const documentArr = ["days", "hours", "mins", "secs"];
  const timeKeys = Object.keys(remainingObj);
  // for of 문은 배열에 많이 씀
  let i = 0;
  for (let tag of documentArr) {
    const remainingTime = format(remainingObj[timeKeys[i]]);
    document.getElementById(tag).textContent = remainingTime;
    i++;
  }

  // for (let i = 0; i < timeKeys.length; i = i + 1) {
  //   documentObj[docKeys[i]].textContent = remainingObj[timeKeys[i]];
  // }

  // for in 문은 객체에 많이 씀
  // let i = 0;
  // for (let key in documentObj) {
  //   documentObj[key].textContent = remainingObj[timeKeys[i]];
  //   i++;
  // }
};

const starter = (targetDateInput) => {
  if (!targetDateInput) {
    targetDateInput = dateFormMaker();
  }
  container.style.display = "flex";
  messageContainer.style.display = "none";
  setClearInterval();
  // for (let i = 0; i < 100; i++) {
  //   setTimeout(() => {
  //     counterMaker();
  //   }, 1000 * i);
  // }
  counterMaker(targetDateInput);
  const intervalId = setInterval(() => counterMaker(targetDateInput), 1000);
  // const intervalId = setInterval(() => {
  //   counterMaker(targetDateInput)
  // }, 1000);
  intervalIdArr.push(intervalId);
};

const setClearInterval = function () {
  for (let i = 0; i < intervalIdArr.length; i++) {
    clearInterval(intervalIdArr[i]);
  }
};

const resetTimer = () => {
  localStorage.removeItem("saved-date");
  container.style.display = "none";
  messageContainer.style.display = "flex";
  messageContainer.innerHTML = "<h3>D-day를 입력해 주세요.</h3>";
  setClearInterval();
};

if (savedData) {
  starter(savedData);
} else {
  container.style.display = "none";
  messageContainer.innerHTML = "<h3>D-day를 입력해 주세요.</h3>";
}
