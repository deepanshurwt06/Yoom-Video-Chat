"use client";
import Image from "next/image";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModel from "./MeetingModel";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { toast } from "sonner"


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
