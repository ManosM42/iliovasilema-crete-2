interface Props {
  center: [number, number];
  markerLabel?: string;
  className?: string;
}

export function MiniMap({ center, className }: Props) {
  const [lat, lng] = center;
  const src = `https://maps.google.com/maps?q=${lat},${lng}&z=17&output=embed`;

  return (
    <iframe
      src={src}
      className={className ?? "w-full h-[400px]"}
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}