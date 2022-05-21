const emails = [
  {
    id: 1,
    from: "abc@gmail.com",
    to: "xyz@gmail.com",
    subject: "job opp",
    body: `Hi Sachin Thakur, 
    We have all grown up seeing tests as a somewhat-scary thing. But, what if we tell you that entrance tests can be fun & rewarding?Scaler presents its first Entrance Test Event where you’ll find other techies (like you) taking one step ahead towards career growth with our entrance test.
    PS: Lucky ones will get amazing rewards!
    Give your upskilling journey a go with our test on Sunday, 22nd May at 12 PM.
    The test includes 13 questions (all MCQs) and the duration is 30+10 minutes. Most students finish it within 30 minutes (and we’re sure you will too!) - but we’ve added an extra 10 minutes, cause we meant it when we said “there’s no pressure”.`,
    isRead: false,
    isStarred: false,
  },
  {
    id: 2,
    from: "abc@gmail.com",
    to: "xyz@gmail.com",
    subject: "job opp",
    body: "We have created some responsive W3.CSS templates for you to use. You are free to modify, save, share, and use them in all your projects.",
    isRead: false,
    isStarred: false,
  },
  {
    id: 3,
    from: "abc@gmail.com",
    to: "xyz@gmail.com",
    subject: "job opp",
    body: "Greetings from me",
    isRead: false,
    isStarred: false,
  },
];

let activeEmail = emails[0].id;

const emailContainer = document.getElementById("email-list");
const mainSection = document.getElementById("main-section");
const navItems = Array.from(document.getElementsByClassName("nav-item"));

const showEmailContent = (id, item) => {
  const selectedEmail = emails.filter((email) => email.id == id);
  mainSection.innerHTML = selectedEmail[0].body;

  if (!selectedEmail[0].isRead) {
    item.classList.remove("unread-email");
    selectedEmail[0].isRead = true;
  }
};

const toggleStarredEmail = (selectedEmailToStar) => {
  const classes = selectedEmailToStar.getAttribute("class");
  if (classes && classes.includes("starred-email")) {
    selectedEmailToStar.classList.remove("starred-email");
  } else {
    selectedEmailToStar.classList.add("starred-email");
  }
  const id = selectedEmailToStar.getAttribute("id").split("-")[1];
  emails.map((email) => {
    if (email.id == id) {
      email.isStarred = !email.isStarred;
    }
  });
};

const toggleEmail = (e) => {
  const selectedEmailItem = e.target;
  const classes = selectedEmailItem.getAttribute("id");
  if (classes.includes("starred")) {
    toggleStarredEmail(selectedEmailItem);
    return;
  }

  const alreadySelectedItem = document.getElementById(
    `email-item-${activeEmail}`
  );

  alreadySelectedItem.classList.remove("active-email");
  selectedEmailItem.classList.add("active-email");

  const selectedEmailId = selectedEmailItem.getAttribute("id");
  activeEmail = selectedEmailId.split("-")[2];

  showEmailContent(selectedEmailId.split("-")[2], selectedEmailItem);
};

const setEventListener = (emailItems) => {
  emailItems.forEach((item) => {
    item.addEventListener("click", toggleEmail);
  });
};

const showEmails = (emails) => {
  const elt = document.getElementsByClassName("email-items-list");
  if (elt.length) {
    emailContainer.removeChild(elt[0]);
    activeEmail = emails.length ? emails[0].id : 0;
    mainSection.innerHTML = "";
  }

  const emailItemsList = document.createElement("ul");
  emailItemsList.classList.add("email-items-list");
  const fragment = document.createDocumentFragment();

  if (!emails.length) {
    mainSection.innerHTML = "You Don't have any Email";
  }
  emails.forEach((email) => {
    const emailItem = document.createElement("li");
    if (email.id == activeEmail) {
      emailItem.classList.add("active-email");
    }
    emailItem.setAttribute("id", `email-item-${email.id}`);
    emailItem.classList.add("email-item");
    emailItem.innerHTML = `${email.from}${email.subject}`;

    const starred = document.createElement("div");
    starred.setAttribute("id", `starred-${email.id}`);
    starred.classList.add("unstarred");
    if (email.isStarred) {
      starred.classList.add("starred-email");
    }
    emailItem.appendChild(starred);
    email.isRead ? "" : emailItem.classList.add("unread-email");

    fragment.appendChild(emailItem);
  });
  emailItemsList.appendChild(fragment);
  emailContainer.appendChild(emailItemsList);
  const emailItems = Array.from(document.getElementsByClassName("email-item"));

  setEventListener(emailItems);
  showEmailContent(
    activeEmail,
    document.getElementById(`email-item-${activeEmail}`)
  );
};

const toggleNavItems = (e) => {
  const classes = e.target.getAttribute("class");
  if (classes.includes("active")) {
    return;
  } else {
    navItems.forEach((item) => {
      if (item.getAttribute("class").includes("active")) {
        item.classList.remove("active");
      }
      if (item == e.target) {
        item.classList.add("active");
      }
    });
  }
  const id = e.target.getAttribute("id");
  if (id == "inbox") {
    showEmails(emails);
  } else if (id == "starred") {
    const starredEmails = emails.filter((email) => email.isStarred);
    showEmails(starredEmails);
  }
};

showEmails(emails);

navItems.forEach((item) => {
  item.addEventListener("click", toggleNavItems);
});
