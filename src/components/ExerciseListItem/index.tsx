import React from "react";
import { ExerciseListItem } from "@/types";

function ExerciseListItem({ title, isCompleted }: ExerciseListItem) {
  return (
    <div className="flex gap-4 items-center">
      <div>
        {isCompleted ? (
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.42038 12.2031C9.03366 12.5898 8.436 12.5898 8.04929 12.2031L5.79929 9.95312C5.41257 9.56641 5.41257 8.96875 5.79929 8.58203C6.186 8.19531 6.78366 8.19531 7.17038 8.58203L8.75241 10.1289L12.5493 6.33203C12.936 5.94531 13.5337 5.94531 13.9204 6.33203C14.3071 6.71875 14.3071 7.31641 13.9204 7.70312L9.42038 12.2031ZM18.8774 9.25C18.8774 14.2422 14.8344 18.25 9.87741 18.25C4.88522 18.25 0.877411 14.2422 0.877411 9.25C0.877411 4.29297 4.88522 0.25 9.87741 0.25C14.8344 0.25 18.8774 4.29297 18.8774 9.25ZM9.87741 1.9375C5.83444 1.9375 2.56491 5.24219 2.56491 9.25C2.56491 13.293 5.83444 16.5625 9.87741 16.5625C13.8852 16.5625 17.1899 13.293 17.1899 9.25C17.1899 5.24219 13.8852 1.9375 9.87741 1.9375Z"
              fill="white"
            />
          </svg>
        ) : (
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.8774 9.25C18.8774 14.2422 14.8344 18.25 9.87741 18.25C4.88522 18.25 0.877411 14.2422 0.877411 9.25C0.877411 4.29297 4.88522 0.25 9.87741 0.25C14.8344 0.25 18.8774 4.29297 18.8774 9.25ZM9.87741 1.9375C5.83444 1.9375 2.56491 5.24219 2.56491 9.25C2.56491 13.293 5.83444 16.5625 9.87741 16.5625C13.8852 16.5625 17.1899 13.293 17.1899 9.25C17.1899 5.24219 13.8852 1.9375 9.87741 1.9375Z"
              fill="#7D7D81"
            />
          </svg>
        )}
      </div>

      <p className="p-0">{title}</p>
    </div>
  );
}

export default ExerciseListItem;