! compile: 'gfortran fibonacci.f90' -> Outputs 'a.exe'
! run: 'a'
! Compiled using MinGW GCC fortran compiler

program fibonacci
   implicit none
   integer :: f, s, t, i
   f = 0
   s = 1
   write(*,*) f
   write(*,*) s
   do i = 1, 45, 1
      t = f + s
      f = s
      s = t
      write(*,*) t
   end do
end program fibonacci
