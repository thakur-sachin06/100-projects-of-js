const emails = [
  {
    id: 1,
    from: "abc@gmail.com",
    to: "xyz@gmail.com",
    subject: "job opp",
    body: "Greetings from me",
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

const showEmailContent = (id, item) => {
  const selectedEmail = emails.filter((email) => email.id == id);
  mainSection.innerHTML = selectedEmail[0].body;

  if (!selectedEmail[0].isRead) {
    item.classList.remove("unread-email");
    selectedEmail[0].isRead = true;
  }
};

const toggleEmail = (e) => {
  const selectedEmailItem = e.target;

  const alreadySelectedItem = document.getElementById(
    `email-item-${activeEmail}`
  );

  alreadySelectedItem.classList.remove("active-email");
  selectedEmailItem.classList.add("active-email");

  const selectedEmailId = selectedEmailItem.getAttribute("id");
  activeEmail = selectedEmailId.split("-")[2];

  showEmailContent(selectedEmailId.split("-")[2], selectedEmailItem);
};

const showEmails = () => {
  const emailItemsList = document.createElement("ul");
  emailItemsList.classList.add("email-items-list");
  const fragment = document.createDocumentFragment();
  emails.forEach((email) => {
    const emailItem = document.createElement("li");
    if (email.id == 1) {
      emailItem.classList.add("active-email");
    }
    emailItem.setAttribute("id", `email-item-${email.id}`);
    emailItem.classList.add("email-item");
    emailItem.innerHTML = `${email.from}${email.subject}`;
    email.isRead ? "" : emailItem.classList.add("unread-email");

    fragment.appendChild(emailItem);
  });
  emailItemsList.appendChild(fragment);
  emailContainer.appendChild(emailItemsList);

  showEmailContent(
    activeEmail,
    document.getElementById(`email-item-${activeEmail}`)
  );
};

showEmails();

const emailItems = Array.from(document.getElementsByClassName("email-item"));

emailItems.forEach((item) => {
  item.addEventListener("click", toggleEmail);
});
