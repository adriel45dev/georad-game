// ShareButton.tsx

import {
  WhatsappShareButton,
  FacebookShareButton,
  TelegramShareButton,
  EmailShareButton,
  FacebookMessengerShareButton,
} from "react-share";
// import { IconType } from "react-icons";
import {
  FaWhatsapp,
  FaFacebook,
  FaTelegram,
  FaFacebookMessenger,
} from "react-icons/fa";

import { AiFillMail } from "react-icons/ai";

interface ShareButtonProps {
  url: string;
  //   children: React.ReactElement<IconType>;
}

export default function ShareButton({ url }: ShareButtonProps) {
  return (
    <>
      <WhatsappShareButton url={url}>
        <FaWhatsapp className="text-white w-10 h-10 hover:text-violet-600" />
      </WhatsappShareButton>

      <FacebookShareButton url={url}>
        <FaFacebook className="text-white w-10 h-10 hover:text-violet-600" />
      </FacebookShareButton>

      <TelegramShareButton url={url}>
        <FaTelegram className="text-white w-10 h-10 hover:text-violet-600" />
      </TelegramShareButton>

      <EmailShareButton url={url}>
        <AiFillMail className="text-white w-10 h-10 hover:text-violet-600" />
      </EmailShareButton>
    </>
  );
}

// Usage
