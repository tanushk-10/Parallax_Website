import { copy as contentText } from '@/data/copy'; /** The static 404 retains the shared shell and gives visitors a clear way back to the field. */
import Button from '@/components/ui/Button';
export default function NotFound() {
  return (
    <section className="not-found container" aria-labelledby="not-found-title">
      <span className="mono text-accent">
        {contentText['app_not-found']['404_position_unknown']}
      </span>
      <h1 id="not-found-title">
        {contentText['app_not-found']['we_lost']}
        <br />
        {contentText['app_not-found']['the']}
        <span className="text-accent">{contentText['app_not-found']['midfield']}</span>
      </h1>
      <p>{contentText['app_not-found']['this_page_drifted_off_the_field']}</p>
      <Button href="/">{contentText['app_not-found']['head_back_home']}</Button>
    </section>
  );
}
