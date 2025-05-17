"use client";

import { useState } from "react";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import Starfield from "react-starfield";

export default function Dashboard() {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<{id: string; name: string; images: string[]; graded: boolean} | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [gradeValue, setGradeValue] = useState("");
  const [comments, setComments] = useState("");
  const [studentsPerPage, setStudentsPerPage] = useState(20);
  const [currentStudentPage, setCurrentStudentPage] = useState(1);
  
  const courses = [
    { id: "CS101", name: "Introduction to Programming" },
    { id: "MATH202", name: "Linear Algebra" },
    { id: "PHY101", name: "Physics I" }
  ];
  
  const students = [
    { 
      id: "2021A7PS0001", 
      name: "Rahul Sharma", 
      images: ["/samples/exam1.jpg", "/samples/exam1_page2.jpg", "/samples/exam1_page3.jpg"],
      graded: true 
    },
    { 
      id: "2021A7PS0042", 
      name: "Priya Patel", 
      images: ["/samples/exam2.jpg", "/samples/exam2_page2.jpg"],
      graded: false
    },
    { 
      id: "2021A7PS0103", 
      name: "Amit Kumar", 
      images: ["/samples/exam3.jpg"],
      graded: true
    },
  ];

  const filteredStudents = students.filter(student => 
    student.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastStudent = currentStudentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const paginate = (pageNumber: number) => setCurrentStudentPage(pageNumber);

  const handleStudentSelect = (student: {id: string; name: string; images: string[], graded : boolean}) => {
    setSelectedStudent(student);
    setCurrentPage(0);
  };

  const goToNextPage = () => {
    if (selectedStudent && currentPage < selectedStudent.images.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-950">
      {/* Background Starfield */}
      <Starfield
      starCount={1000}
      starColor={[255, 255, 255]}
      speedFactor={0.05}
      backgroundColor="black"
      
       />
      
      {/* Navbar */}
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-10 h-10">
                <Image
                  src="/Logo/bits_logo.png"
                  alt="BITS Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-bold text-lg text-blue-600 dark:text-blue-400">ExamEase Portal</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Paper Scanning Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Grade scanned papers for your courses</p>
        </div>
        
        {/* Main Content Area */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden mb-8">          
          <div className="p-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Grade Scanned Papers</h1>
              
              {/* Course Selection Dropdown */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Course
                </label>
                <select
                  className="w-full md:w-1/3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2"
                  value={selectedCourse}
                  onChange={(e) => {
                    setSelectedCourse(e.target.value);
                    setSelectedStudent(null);
                    setCurrentStudentPage(1);
                  }}
                >
                  <option value="">Select a course</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>{course.id} - {course.name}</option>
                  ))}
                </select>
              </div>
              
              {selectedCourse && (
                <>
                  {/* Search and pagination controls */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                    <div className="w-full md:w-1/3">
                      <input
                        type="text"
                        placeholder="Search by ID or name..."
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setCurrentStudentPage(1);
                        }}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Show:</span>
                      <select
                        className="border border-gray-300 dark:border-gray-700 rounded-lg px-2 py-1 text-sm bg-white dark:bg-gray-800"
                        value={studentsPerPage}
                        onChange={(e) => {
                          setStudentsPerPage(Number(e.target.value));
                          setCurrentStudentPage(1);
                        }}
                      >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>
                      <span className="text-sm text-gray-600 dark:text-gray-400">students</span>
                    </div>
                  </div>
                
                  {/* Students Grid - optimized for many items */}
                  <div className="mb-6 overflow-hidden">
                    {filteredStudents.length > 0 ? (
                      <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                          {currentStudents.map(student => (
                            <div
                              key={student.id}
                              className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                                selectedStudent?.id === student.id
                                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                  : student.graded 
                                    ? "border-green-500 bg-green-50 dark:bg-green-900/10 hover:bg-green-100 dark:hover:bg-green-900/20" 
                                    : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                              }`}
                              onClick={() => handleStudentSelect(student)}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium text-sm truncate" title={student.id}>{student.id}</p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate" title={student.name}>{student.name}</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{student.images.length} page(s)</p>
                                </div>
                                {student.graded && (
                                  <span className="text-green-600 dark:text-green-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Pagination */}
                        {totalPages > 1 && (
                          <div className="flex justify-center mt-6">
                            <nav className="flex items-center space-x-1">
                              <button
                                onClick={() => paginate(Math.max(1, currentStudentPage - 1))}
                                disabled={currentStudentPage === 1}
                                className={`px-2 py-1 rounded ${
                                  currentStudentPage === 1 
                                    ? 'text-gray-400 cursor-not-allowed' 
                                    : 'text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                                }`}
                              >
                                ←
                              </button>
                              
                              {/* Page numbers - show limited pages for large datasets */}
                              {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                                let pageNumber;
                                
                                if (totalPages <= 5) {
                                  pageNumber = idx + 1;
                                } else if (currentStudentPage <= 3) {
                                  pageNumber = idx + 1;
                                  if (idx === 4) pageNumber = totalPages;
                                } else if (currentStudentPage >= totalPages - 2) {
                                  pageNumber = totalPages - 4 + idx;
                                } else {
                                  pageNumber = currentStudentPage - 2 + idx;
                                }
                                
                                return (
                                  <button
                                    key={pageNumber}
                                    onClick={() => paginate(pageNumber)}
                                    className={`px-3 py-1 rounded ${
                                      currentStudentPage === pageNumber
                                        ? 'bg-blue-600 text-white'
                                        : 'text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                                    }`}
                                  >
                                    {pageNumber}
                                  </button>
                                );
                              })}
                              
                              <button
                                onClick={() => paginate(Math.min(totalPages, currentStudentPage + 1))}
                                disabled={currentStudentPage === totalPages}
                                className={`px-2 py-1 rounded ${
                                  currentStudentPage === totalPages 
                                    ? 'text-gray-400 cursor-not-allowed' 
                                    : 'text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                                }`}
                              >
                                →
                              </button>
                            </nav>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                        No students found matching "{searchQuery}"
                      </div>
                    )}
                  </div>
                </>
              )}
              
              {selectedStudent && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 md:p-6 border border-gray-100 dark:border-gray-700">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Scanned Image with Pagination */}
                    <div className="space-y-4">
                      <div className="relative h-[400px] md:h-[500px] bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden">
                        <Image
                          src={selectedStudent.images[currentPage]}
                          alt={`${selectedStudent.name}'s exam - page ${currentPage + 1}`}
                          fill
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                      
                      {/* Pagination Controls */}
                      <div className="flex items-center justify-between mt-2">
                        <button 
                          onClick={goToPrevPage}
                          disabled={currentPage === 0}
                          className={`px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm flex items-center ${
                            currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300 dark:hover:bg-gray-600'
                          }`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          Previous
                        </button>
                        
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Page {currentPage + 1} of {selectedStudent.images.length}
                        </span>
                        
                        <button 
                          onClick={goToNextPage}
                          disabled={currentPage === selectedStudent.images.length - 1}
                          className={`px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm flex items-center ${
                            currentPage === selectedStudent.images.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300 dark:hover:bg-gray-600'
                          }`}
                        >
                          Next
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {/* Grading Form */}
                    <div>
                      <h2 className="text-xl font-bold mb-2">{selectedStudent.name}</h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">ID: {selectedStudent.id}</p>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Grade (Numeric)</label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            step="0.5"
                            placeholder="Enter grade (e.g., 85)"
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800"
                            value={gradeValue}
                            onChange={(e) => setGradeValue(e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Comments</label>
                          <textarea 
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 h-32"
                            placeholder="Enter feedback for student..."
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                          ></textarea>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex-1"
                            onClick={() => {
                                const updatedStudents = students.map(student => {
                                if (student.id === selectedStudent?.id) {
                                    return { ...student, graded: true };
                                }
                                return student;
                                });
                                setSelectedStudent(selectedStudent ? { ...selectedStudent, graded: true } : null);
                                alert(`Grade saved for ${selectedStudent?.name}`);
                            }}
                          >
                            Save Grade
                          </button>
                          <button className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                            Skip Student
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}