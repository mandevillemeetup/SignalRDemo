﻿using Core.Models;
using Microsoft.AspNet.SignalR.Client;
using System;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;
using System.Windows.Threading;

namespace WpfClient
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public System.Threading.Thread Thread { get; set; }
        public string Host = "http://localhost:8080/";

        public IHubProxy Proxy { get; set; }
        public HubConnection Connection { get; set; }

        public bool Active { get; set; }

        public MainWindow()
        {
            InitializeComponent();
        }

        private async void ActionSendButtonClick(object sender, RoutedEventArgs e)
        {
            await SendMessage();
        }

        private async void ActionSendNotificationButtonClick(object sender, RoutedEventArgs e)
        {
            await SendNotification();
        }

        private async Task SendMessage()
        {
            await Proxy.Invoke("Send", new ChatMessage{Message = MessageTextBox.Text, Sender = ClientNameTextBox.Text, SentDateTime = DateTime.Now});
        }

        private async Task SendNotification()
        {
            await Proxy.Invoke("SendNotification", new ChatMessage { Message = MessageTextBox.Text, Sender = ClientNameTextBox.Text, SentDateTime = DateTime.Now });
        }

        private async void ActionWindowLoaded(object sender, RoutedEventArgs e)
        {
            Active = true;
            Thread = new System.Threading.Thread(() =>
            {
                Connection = new HubConnection(Host);
                Proxy = Connection.CreateHubProxy("ChatHub");

                Proxy.On<ChatMessage>("addmessage", (message) => OnSendData(message.Sender + ": " + message.Message));

                Connection.Start();

                while (Active)
                {
                    System.Threading.Thread.Sleep(10);
                }
            }) { IsBackground = true };
            Thread.Start();

        }

        private void OnSendData(string message)
        {
            //Dispatcher.Invoke(DispatcherPriority.Normal, (Action)(() => MessagesListBox.Items.Insert(0, message)));
            Dispatcher.Invoke(DispatcherPriority.Normal, (Action)(() => MessagesListBox.Items.Add(message)));
        }

        private async void ActionMessageTextBoxOnKeyDown(object sender, KeyEventArgs e)
        {
            if (e.Key == Key.Enter || e.Key == Key.Return)
            {
                await SendMessage();
                MessageTextBox.Text = "";
            }
        }
    }
}
