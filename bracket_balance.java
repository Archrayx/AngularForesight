import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Stack;

/**
 * bracket_balance
 */
public class bracket_balance {
    public static void main(String[] args) {
        bracketCheck();
    }
    public static void bracketCheck(){
        //Creates List of brackets open and closed
        ArrayList<Character> bracketStr = new ArrayList<>(
        Arrays.asList('(', '{', '[', '{', '[', '(', '[', ']', '(', ')', ')', ']', '}', ']', '}', ')'));
        HashMap<Character, Character> lib = new HashMap<>();

        //add key value pairs to hashmap
        lib.put('(',')');
        lib.put('[',']');
        lib.put('{','}');

        //Creates the stack top check balance
        Stack<Character> order = new Stack<>();
        int count = 0;
        
        while (count < bracketStr.size()){
            if (lib.containsKey(bracketStr.get(count))) {
                order.push(bracketStr.get(count));}
            else if(bracketStr.get(count) != lib.get(order.pop())){
                System.out.println("Bracket Mismatched and Failed test :(");
                return;
            }
            System.out.println("Stack Contains:" + order.toString());
            count++;
        }
        System.out.println("Bracket Matched perfectedly");
    }
    }



