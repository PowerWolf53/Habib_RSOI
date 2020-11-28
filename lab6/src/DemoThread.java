import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.*;


import java.util.concurrent.ThreadLocalRandom;
import javax.imageio.ImageIO;
import javax.swing.*;


public class DemoThread extends JFrame{


    private int pushkaWidth = 300, pushkaHeight = 150, mishenWidth = 100, mishenHeight = 100, mishenY = 250, bombX = 310, bombY = 270,
            bombWidth=40,bombHeight=40,vsrivX=0,vsrivY=0,vsrivWidth=0 ,vsrivHeight=0,mishenX=650;
    public int mishenXX;
    public int mishenYY;
    private static Image background;
    private static Image bomb;
    private static Image mishen;
    private static Image pushka;
    private static Image vsriv;
    JButton bt;



    public DemoThread() {
        setTitle("Demo app");
        setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        setSize(1000, 600);
        setLocationRelativeTo(null);
        setResizable(false);

        //  Background() - панель, для которой переопределен paintComponent с фоном
        setContentPane(new Background()); // панель устанавливается как contentPane в наследнике JFrame
        Container content = getContentPane(); //теперь все элементы интерфейса будут на этой панели.

        bt = new JButton("Стрелять!");
        bt.setPreferredSize(new Dimension(1000,50));
        bt.setBackground(Color.white);
        bt.setForeground(Color.BLACK);
        bt.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                bt.setVisible(false);
                Thread mishenMove = new Thread(new MishenThread());
                mishenMove.start();
                Thread bombMove = new Thread(new BombThread());
                bombMove.start();

            }
        });
        content.add(bt);
        content.add(new CloudSnowbank());
    }

    private static class Background extends JPanel{ // отрисовка нового фона

        @Override
        protected void paintComponent(Graphics g){
            super.paintComponent(g);
            try {
                background = ImageIO.read(new File("C:\\Users\\karol\\IdeaProjects\\6lab\\background.jpg"));
            } catch (IOException e) {
                e.printStackTrace();
            }
            g.drawImage(background,0,0,1000,600,null);
        }
    }

    private class CloudSnowbank extends JPanel{

        public CloudSnowbank() {
            setOpaque(false);
            setPreferredSize(new Dimension(1000, 600));
            try {
                pushka = ImageIO.read(new File("C:\\Users\\karol\\IdeaProjects\\6lab\\pushka.png"));
                mishen= ImageIO.read(new File("C:\\Users\\karol\\IdeaProjects\\6lab\\mishen.png"));
                bomb =  ImageIO.read(new File("C:\\Users\\karol\\IdeaProjects\\6lab\\bomb.png"));
                vsriv =  ImageIO.read(new File("C:\\Users\\karol\\IdeaProjects\\6lab\\vsriv.png"));
            }
            catch (IOException exc) {};

        }

        @Override
        protected void paintComponent(Graphics g) {
            super.paintComponent(g);
            Graphics2D graphics2D = (Graphics2D)g;
            graphics2D.drawImage( pushka, 10, 270,  pushkaWidth,  pushkaHeight, this);
            graphics2D.drawImage(mishen, mishenX,mishenY, mishenWidth, mishenHeight, this);
            graphics2D.drawImage(bomb,bombX ,bombY,bombWidth ,bombHeight, this);
            graphics2D.drawImage(vsriv,vsrivX ,vsrivY,vsrivWidth ,vsrivHeight, this);

        }
    }

    public class MishenThread implements Runnable{
        @Override
        public void run() {

            mishenX = ThreadLocalRandom.current().nextInt(400)+500;
            mishenXX=mishenX;
            mishenY = ThreadLocalRandom.current().nextInt(500);
            mishenYY=mishenY;
                    repaint();

                try {
                    Thread.sleep(150);
                }
                catch (Exception exc) {};


        }
    }

   public class BombThread implements Runnable{
        @Override
        public void run() {
double delX=(mishenX-bombX)/5;
double delY=(mishenY-bombY)/5;

                while (bombX != mishenX&&bombY!=mishenY) {
                    bombX+=delX;
                    bombY+=delY;
                    repaint();
                    if ((bombX<=mishenX+10&&bombX>=mishenX-10)&&(bombY<=mishenY+10&&bombY>=mishenY-10)) {
                        bombHeight = 0;
                        bombWidth = 0;
                        vsrivWidth = 100;
                        vsrivHeight = 100;
                        vsrivX=mishenXX;
                        vsrivY=mishenYY;

                        repaint();
                    } else repaint();
                    try {
                        Thread.sleep(150);
                    } catch (Exception exc) {
                    }
                    ;
               }


        }
    }
    public static void main(String[] args) throws IOException {
        new DemoThread().setVisible(true);
    }
}
