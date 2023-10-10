import AlbumContainer from "@/components/Music/AlbumCard";

export default function Workspace() {
  return (
    <div className="flex gap-4">
      <AlbumContainer id="1" authorName="Unknown" name="Single" imageUrl="" key={1} />
      <AlbumContainer id="1" authorName="Unknown" name="Single" imageUrl="" key={1} />
      <AlbumContainer id="1" authorName="Unknown" name="Single" imageUrl="" key={1} />
      <AlbumContainer id="1" authorName="Unknown" name="Single" imageUrl="" key={1} />
      <AlbumContainer id="1" authorName="Unknown" name="Single" imageUrl="" key={1} />
      <AlbumContainer id="1" authorName="Unknown" name="Single" imageUrl="" key={1} />
      <AlbumContainer id="1" authorName="Unknown" name="Single" imageUrl="" key={1} />
    </div>
  );
}
