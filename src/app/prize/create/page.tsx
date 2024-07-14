'use client';

import ImageComponent from '@/components/dropzone';
import { TextEditor } from '@/components/richtexteditor/textEditor';
import { config } from '@/utils/config';
import { PRIZE_FACTORY_ABI } from '@/utils/constants';
import { Database } from '@/utils/database.types';
import { uploadImages } from '@/utils/helpers';
import {
  Badge,
  Button,
  Card,
  Loader,
  Modal,
  SimpleGrid,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { createClient } from '@supabase/supabase-js';
import { IconAlertTriangleFilled } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { env } from 'process';
import { useState } from 'react';
import { toast } from 'sonner';
import { useAccount } from 'wagmi';
import {  waitForTransactionReceipt, writeContract } from 'wagmi/actions';
function Prize() {
  const [judges, setJudges] = useState<string[]>([]);
  const [showJudges, setShowJudges] = useState(false);
  const [title, setTitle] = useState('');
  const [richtext, setRichtext] = useState('');
  const [isAutomatic, setIsAutomatic] = useState(false);

  

  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [images, setImages] = useState<string>();

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [modalOpened, setModalOpened] = useState(false);



  const [startSubmisionDate, setStartSubmissionDate] = useState<Date>(new Date());






  const onJudgesChange = (index: number, value: string) => {
    setJudges((prev) => {
      prev[index] = value;
      return [...prev];
    });
  };


  const handleUploadImages = async () => {
    console.log(files, 'files');
    const newImages = await uploadImages(files);
    // setImages(newImages);
    return newImages;
  };
  const {address} = useAccount()

  const submit = async () => {
    console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
    
    console.log({
      admins: [address],
      description: richtext,
      proposer_address:address,
      title,
    });

    const newImages = await handleUploadImages();

    console.log(newImages, 'newImages');

    // await addProposalsMutation({
    //   admins: [wallet.address],
    //   description: richtext,
    //   isAutomatic,
    //   voting_time: votingTime,
    //   proposer_address: wallet.address,
    //   priorities: [],
    //   proficiencies: [],
    //   submission_time: proposalTime,
    //   startSubmissionDate: startSubmisionDate.toISOString(),
    //   startVotingDate: startVotingDate.toISOString(),
    //   images: newImages ? [newImages] : [],
    //   judges: showJudges ? judges : [],
    //   title,
    // });\
    if(!address) {
        toast.error("Please connect your wallet")
        return;
    };


    const tx = await writeContract(config,{
        abi:PRIZE_FACTORY_ABI,
        address:`0x9dF60EF0399Ad81A6C4AdAacc749Dc493563CF31`,
        functionName:"createViaPrize",
        args:[address , [address], BigInt(5),BigInt(5), BigInt(1)]
    })

    const waitForTransactionOut = await waitForTransactionReceipt(config,{
        hash: tx,
        confirmations: 1,
    });
    const prizeAddress = `0x${waitForTransactionOut.logs[0].topics[2]?.slice(-40)}`;
    
    const client = createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
        process.env.NEXT_PUBLIC_SUPABASE_API_KEY ?? "",
    );
    await client.from('prizes').insert({
        admins: [address],
        contract_address: prizeAddress,
        description: richtext,
        proposer_address: address,
        title,
        image: newImages,
    });
    
    setLoading(false);
    // router.push("/")

    setModalOpened(true);
    // setTimeout(() => {
    //   setModalOpened(false);
    //   router.push(`/profile/${appUser?.username}`);
    // }, 6000);
  };

  const handleSubmit = () => {
    setLoading(true);
    try {
      // console.log(images, 'images');
      toast.promise(submit(), {
        loading: 'Submitting Proposal...',
        success: 'Proposal Submitted',
        error: (err) => {
          console.log(err);
          return `Failed to submit proposal ${err}`;
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      /* eslint-disable */
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };




  return (
    <Card shadow="md" withBorder className="w-full p-8 m-6">
    

      <Title order={1} className="my-2">
        Create a Prize
      </Title>
      <ImageComponent files={files} setfiles={setFiles} />
      <TextInput
        className="my-2"
        placeholder="Waster Management System"
        label="Enter the title of your proposal"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <TextEditor richtext={richtext} setRichtext={setRichtext} canSetRichtext />
      
      <Button
        className="mt-3 "
        fullWidth
        color="primary"
        loading={loading}
        onClick={handleSubmit}
      >
        Deploy
      </Button>
    </Card>
  );
}
export default Prize;