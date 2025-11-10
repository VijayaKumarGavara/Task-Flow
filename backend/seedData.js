import connectDB from "./config.js";
import Task from "./Task.js";
import generateId from "../src/utils/generateId.js";
import mongoose from "mongoose";

// Utility to get random time between 5:00 AM and 10:30 PM
function getRandomTime() {
  const startHour = 5; // 5 AM
  const endHour = 22; // 10 PM

  // Choose a random hour between 5 and 22
  let hour = Math.floor(Math.random() * (endHour - startHour + 1)) + startHour;

  // Randomly choose between 00 and 30 minutes
  const minute = Math.random() < 0.5 ? 0 : 30;

  // Format hour for 12-hour clock
  const period = hour >= 12 ? "PM" : "AM";
  if (hour > 12) hour -= 12;
  if (hour === 0) hour = 12; // handle midnight case

  // Format output like "5:00 AM" or "5:30 PM"
  const formattedMinute = minute === 0 ? "00" : "30";
  return `${hour}:${formattedMinute} ${period}`;
}


// Generate random task objects
function generateRandomTasks() {
  const priorities = ["High", "Medium", "Low"];
  const today = new Date("2025-11-11"); // tomorrow
  const allTasks = [];

  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    if(i>8)
        date.setDate(today.getDate() + Math.floor(Math.random() * 5)); // random next 5 days
    else 
        date.setDate(today.getDate());
    const start = getRandomTime();
    const end = getRandomTime();

    allTasks.push({
      taskId: generateId(),
      title: `Task ${i + 1}`,
      description: `Description for task ${i + 1}`,
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      startTime: start,
      endTime: end,
      date: date.toISOString().split("T")[0],
      isCompleted: false, // 30% chance completed
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  return allTasks;
}

async function seed() {
  try {
    connectDB();

    const tasks = generateRandomTasks();

    await Task.insertMany(tasks);
    console.log(`🌱 Inserted ${tasks.length} random tasks`);
  } catch (err) {
    console.error("❌ Error seeding tasks:", err);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
