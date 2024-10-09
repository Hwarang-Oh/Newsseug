function ProfileIconImage({ imgUrl }: Readonly<{ imgUrl: string }>) {
  return (
    <defs>
      <pattern
        id="profileImage"
        patternUnits="userSpaceOnUse"
        width="100%"
        height="100%"
      >
        <image
          href={imgUrl}
          x="0"
          y="0"
          width="108"
          height="108"
          preserveAspectRatio="xMidYMid slice"
        />
      </pattern>
    </defs>
  );
}

export default ProfileIconImage;
