import "../styles/wedding.css";
import { initWeddingShell } from "../lib/client/wedding";

const engagementImages = Array.from({ length: 11 }, (_, index) => `/wedding/img/engagement/Aieleen-Landen-Engagement-${index}.jpg`);
const proposalImages = Array.from({ length: 8 }, (_, index) => `/wedding/img/proposal/landenfinals-lauriejeanphotography-${index}.jpg`);

function fillGallery(id: string, images: string[]) {
  const gallery = document.getElementById(id);
  if (!gallery) return;

  gallery.replaceChildren();
  for (const src of images) {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "";
    img.loading = "lazy";
    img.className = "apl-pic";
    gallery.appendChild(img);
  }
}

function installStoryBackgrounds() {
  const laPush = document.getElementById("laPushFam");
  const storyOne = document.getElementById("aplStoryOne");
  const homeThree = document.getElementById("aplHomeThree");
  const back3 = document.getElementById("aplBackground3");
  const back4 = document.getElementById("aplBackground4");
  const back7 = document.getElementById("aplBackground7");
  const back8 = document.getElementById("aplBackground8");

  if (!laPush || !storyOne || !homeThree || !back3 || !back4 || !back7 || !back8) {
    return;
  }

  const changeBackground = () => {
    const trigger2 = laPush.getBoundingClientRect();
    const trigger3 = storyOne.getBoundingClientRect();
    const trigger4 = homeThree.getBoundingClientRect();

    if (trigger2.bottom > 0 && trigger2.bottom < window.innerHeight) {
      back3.style.transform = `translateY(-${window.innerHeight - trigger2.bottom}px)`;
      back4.style.transform = `translateY(${trigger2.bottom}px)`;
    } else if (trigger2.bottom <= -1) {
      back3.style.transform = "translateY(-100%)";
    } else if (trigger2.top > window.innerHeight) {
      back3.style.transform = "translateY(0)";
      back4.style.transform = `translateY(${window.innerHeight}px)`;
      back7.style.transform = `translateY(${window.innerHeight}px)`;
      back8.style.transform = `translateY(${window.innerHeight}px)`;
    }

    if (trigger3.bottom > 0) {
      back7.style.transform = `translateY(${trigger3.bottom}px)`;
    } else {
      back7.style.transform = "translateY(0)";
    }

    if (trigger4.bottom > 0) {
      back8.style.transform = `translateY(${trigger4.bottom}px)`;
    } else {
      back8.style.transform = "translateY(0)";
    }
  };

  window.addEventListener("scroll", changeBackground, { passive: true });
  changeBackground();
}

document.addEventListener("DOMContentLoaded", () => {
  initWeddingShell();
  fillGallery("engagementGallery", engagementImages);
  fillGallery("proposalGallery", proposalImages);
  installStoryBackgrounds();
});
