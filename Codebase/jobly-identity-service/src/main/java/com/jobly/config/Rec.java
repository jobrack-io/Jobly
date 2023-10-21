package com.jobly.config;
record Person(int id, String name){};
public  class Rec {

public static void main( String[] args )
        {
        Person p1 = new Person(1,"Peter Parker");
        Person p2 = new Person(2,"Spiderman");
        System.out.println(p1.toString());
        System.out.println(p1.equals(p2));
        System.out.println(p1.name());
        }
}
