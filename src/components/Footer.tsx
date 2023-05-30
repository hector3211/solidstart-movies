import { IoPerson } from "solid-icons/io";
import { FaBrandsTwitter } from "solid-icons/fa";
import { A } from "solid-start";
export default function Footer() {
  return (
    <footer class="footer flex justify-between items-center p-4 bg-neutral text-neutral-content mt-5">
      <div class="items-center grid-flow-col">
        <p>👾</p>
        <p>Copyright © 2023 - Hector Oropesa - All right reserved</p>
      </div>
      <div class="grid-flow-col gap-4 sm:place-self-end md:place-self-center md:justify-self-end">
        <A href="https://hectororopesa.com" target="_blank">
          <IoPerson class="hover:scale-110 hover:cursor-pointer" />
        </A>
        <A href="https://twitter.com/HectorOropesa1" target="_blank">
          <FaBrandsTwitter class="hover:scale-110 hover:cursor-pointer" />
        </A>
      </div>
    </footer>
  );
}
