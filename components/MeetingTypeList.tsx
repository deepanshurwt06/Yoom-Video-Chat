"use client";
import Image from "next/image";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModel from "./MeetingModel";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { toast } from "sonner"
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";





const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduledMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
   
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime : new Date(),
    description: "",
    link:''
  })
  const [callDetails, setCallDetails] = useState<Call>()

  const createMeeting = async () => {
    if(!client || !user) {
      return;
    } 
    try {
      if(!values.dateTime) {
        toast("Please select a date and time");
        return; 
      }
      const id = crypto.randomUUID();
      const call = client.call('default', id)

      if(!call) throw new Error('Failed to create call');
      
      const startAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant Meeting';

      await call.getOrCreate({
        data:{
          starts_at: startAt,
          custom: {
            description
          }
        }
      })
      setCallDetails(call);

      if(!values.description){
        router.push(`/meeting/${call.id}`);
      }
      toast("Meeting created successfully");
    } catch (error) {
      console.log(error);
      toast("Failed to create meeting");
    }
  };
   
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;


  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState("isInstantMeeting")}
        className="bg-[#FF742E]"
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={() => setMeetingState("isScheduledMeeting")}
        className="bg-[#0e78f8]"
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Check out your recordings"
        handleClick={() => router.push("/recordings")}
        className="bg-purple-500"
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="Via invitation link"
        handleClick={() => setMeetingState("isJoiningMeeting")}
        className="bg-[#F9A90E]"
      />

      {!callDetails ? (
        <MeetingModel
        isOpen={meetingState === "isScheduledMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Create Meeting"
        handleClick={createMeeting}
        > 
        <div className="flex flex-col gap-2.5 ">
          <label className="text-base text-normal leading-[22px] text-[#ECF0FF] ">Add a description</label>

          <Textarea className="border-none bg-[#2f344e] focus-visible:ring-0 focus-visible:ring-offset-0" 
          onChange={(e) => {
            setValues({...values, description: e.target.value})
          }} />

        

        </div>
        
        <div className="flex w-full flex-col gap-2.5">
        <label className="text-base text-normal leading-[22px] text-[#ECF0FF] ">Select Date and Time</label>
          <ReactDatePicker 
           selected={values.dateTime}
           onChange={(date) => setValues({...values, dateTime : date!})}
           showTimeSelect
           timeFormat="HH:mm"
           timeIntervals={15}
           timeCaption="time"
           dateFormat="MMMM d, yyyy h:mm aa"
           className="w-full rounded bg-[#2f344e] p-2 focus:outline-none"
          />

        </div>

        </MeetingModel>
      ) : (
        <MeetingModel
        isOpen={meetingState === "isScheduledMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Meeting Created"
        className="text-center"
       
        handleClick={ () => {
          navigator.clipboard.writeText(meetingLink);
          toast("Meeting link copied to clipboard");        
        }}
        image="/icons/checked.svg"
        buttonIcon="/icons/copy.svg"
        buttonText="Copy Meeting Link"
        />
      )}

      <MeetingModel
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
        />
    </section>
  );
};

export default MeetingTypeList;
