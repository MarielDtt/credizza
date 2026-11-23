import MariaChat from '@/components/buttons/MariaChat';
import ButtonChat from '@/components/buttons/ButtonChat';
import CrispWidget from '@/components/layout/CrispWidget';
import {chatProvider} from '@/lib/chat-provider';

export default function ChatWidget(){
 return chatProvider()==='maria'?<MariaChat/>:<><CrispWidget/><ButtonChat/></>;
}
