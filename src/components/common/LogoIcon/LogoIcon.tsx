import React, { FC } from 'react';

type Props = {
  fill?: string;
};

const LogoIcon: FC<Props> = ({ fill }) => {
  return (
    <svg
    className="w-[16px] h-[12px] sm:w-[20px] sm:h-[16px]" 
      viewBox='0 0 38 43'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M11.3433 25.4519L31 40.1862C26.5411 42.8135 20.0648 42.5866 15.9543 39.5054L1.99102 29.0388C0.669659 28.0483 0.669659 26.4424 1.99102 25.4519C4.57358 23.516 8.76076 23.516 11.3433 25.4519Z'
        fill={fill || 'white'}
      />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M2.39058 27.0006C3.48 26.2056 4.94947 25.7833 6.45912 25.7833L2.39058 27.0006ZM6.45912 25.7833C7.96877 25.7833 9.43826 26.2056 10.5277 27.0006L6.45912 25.7833ZM11.5786 25.5601L32 40.4633L30.8081 41.1471C26.1394 43.8252 19.3958 43.6086 15.0577 40.4427L1.33964 30.4315C0.501902 29.8201 0 28.949 0 27.9958C0 27.0426 0.501882 26.1715 1.33962 25.5601C2.78739 24.5035 4.64335 24 6.45912 24C8.27488 24 10.1308 24.5035 11.5786 25.5601ZM10.5277 27.0006L28.6479 40.2246L10.5277 27.0006ZM28.6479 40.2246C24.6609 41.8797 19.4753 41.459 16.1086 39.0021L2.39058 28.9909C2.39057 28.9909 2.39059 28.9909 2.39058 28.9909C1.93017 28.6549 1.78296 28.2842 1.78296 27.9958C1.78296 27.7073 1.93017 27.3367 2.39058 27.0006'
        fill={fill || 'white'}
      />
      <path
        d='M22.5441 3.356L36.042 13.2412C37.3193 14.1767 37.3193 15.6933 36.042 16.6288C33.5455 18.4571 29.498 18.4571 27.0014 16.6288L8 2.71308C12.3103 0.231701 18.5707 0.446016 22.5441 3.356Z'
        fill={fill || 'white'}
      />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M9.35205 2.7755L27.4723 15.9994C28.5617 16.7944 30.0312 17.2167 31.5409 17.2167C33.0505 17.2167 34.52 16.7944 35.6094 15.9994C36.0698 15.6634 36.217 15.2928 36.217 15.0043C36.217 14.7158 36.0698 14.3452 35.6094 14.0092L21.8913 3.9979C18.5247 1.54096 13.3391 1.12028 9.35205 2.7755ZM7.19186 1.85303C11.8606 -0.825254 18.6042 -0.608572 22.9423 2.55732L36.6604 12.5686C37.4981 13.18 38 14.0511 38 15.0043C38 15.9575 37.4981 16.8286 36.6604 17.4399C35.2126 18.4965 33.3566 19 31.5409 19C29.7251 19 27.8692 18.4965 26.4214 17.4399L6 2.53676L7.19186 1.85303Z'
        fill={fill || 'white'}
      />
      <path
        d='M33.6009 37L5.29949 16.6998C1.2242 13.7767 0.924015 9.17102 4.39906 6L32.7005 26.3002C36.7758 29.2233 37.076 33.829 33.6009 37Z'
        fill={fill || 'white'}
      />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M4.24823 4L33.3105 25.1731C35.536 26.7945 36.8047 28.9426 36.9793 31.2028C37.1541 33.4665 36.2205 35.7119 34.2982 37.4935L33.7518 38L4.68948 16.8269C2.46404 15.2056 1.1953 13.0574 1.02074 10.7972C0.845912 8.53351 1.77947 6.28814 3.70178 4.50647L4.24823 4ZM4.41392 6.35718C3.21513 7.69405 2.71278 9.20795 2.8248 10.6583C2.95207 12.3064 3.88333 14.0031 5.756 15.3675L33.5861 35.6428C34.7849 34.306 35.2872 32.7921 35.1752 31.3417C35.0479 29.6937 34.1167 27.9969 32.244 26.6326L4.41392 6.35718Z'
        fill={fill || 'white'}
      />
    </svg>
  );
};

export default LogoIcon;